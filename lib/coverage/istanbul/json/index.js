const fs = require('fs/promises');

/**
 * Parse coverage info from istanbul json reportor file.
 * @param {string} filePath istanbul json reportor file path.
 * @requires {Object}
 * {
 *  `filePath`: {
 *    codeLines: number[], // All code lines of the file.
 *    unCoverdCodeLines: number[], // uncoverd code lines of the file.
 *  }
 * }
 */
module.exports = async (filePath) => {
  let content = await fs.readFile(filePath, { encoding: 'utf-8' });
  content = JSON.parse(content);

  const coverMap = {};

  Object.entries(content).forEach(([key, info]) => {
    const { statementMap, s } = info;
    const codeLines = new Set();
    const uncoverdCodeLines = new Set();

    Object.values(statementMap).forEach((item) => {
      const {
        start: { line: startLine },
        end: { line: endLine },
      } = item;

      for (let i = startLine; i <= endLine; i += 1) {
        codeLines.add(i);
      }
    });

    Object.entries(s).forEach(([index, coverdTimes]) => {
      if (coverdTimes === 0) {
        const {
          start: { line: startLine },
          end: { line: endLine },
        } = statementMap[index];

        for (let i = startLine; i <= endLine; i += 1) {
          uncoverdCodeLines.add(i);
        }
      }
    });

    coverMap[key] = {
      codeLines: Array.from(codeLines),
      uncoverdCodeLines: Array.from(uncoverdCodeLines),
    };
  });

  return coverMap;
};

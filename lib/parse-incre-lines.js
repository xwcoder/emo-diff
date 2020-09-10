/**
 * parse incrment lines from unified diff content.
 * @param {string} content
 * @returns Object {filePath: number[]}
 */
const parseIncrementLines = (content = '') => {
  const lines = content.split('\n');
  const files = {};
  const fileMap = new Map();
  let filePath = '';

  lines.forEach((line) => {
    if (line.startsWith('+++')) {
      filePath = line.substring(line.indexOf('/') + 1);

      if (!fileMap.has(filePath)) {
        fileMap.set(filePath, new Set());
      }
    } else if (line.startsWith('@@')) {
      /\+(.*?)\s/.exec(line);
      const [start, len = 1] = RegExp.$1.split(',');
      const startNo = parseInt(start, 10);

      const incrementLines = fileMap.get(filePath);

      for (let i = 0; i < len; i += 1) {
        incrementLines.add(startNo + i);
      }
    }
  });

  fileMap.forEach((incrementLines, key) => {
    if (incrementLines.size !== 0) {
      files[key] = Array.from(incrementLines);
    }
  });

  return files;
};

module.exports = parseIncrementLines;

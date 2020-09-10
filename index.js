const getDiffContent = require('./lib/diff');
const parseCoverage = require('./lib/coverage');
const report = require('./lib/reporter');
const parseIncreLinesFromDiff = require('./lib/parse-incre-lines');

/**
 * @typedef {import('./diff/index.js').Options} DiffOptions
 * @typedef {import('./coverage/index.js').Options} CoverageOptions
 */

/**
 * @typedef {Object} Options
 * @property {DiffOptions} diff
 * @property {CoverageOptions} coverage
 * @property {string[]} reporters
 */

/**
 * Parse untest coverd increment code lines.
 * @param {Options} options
 */
module.exports = async (options = {}) => {
  const {
    diff = {},
    coverage,
    reporters = [],
  } = options;

  const diffContent = await getDiffContent(diff);
  const coverMap = await parseCoverage(coverage);
  const incrementMap = parseIncreLinesFromDiff(diffContent);

  const coverFiles = Object.keys(coverMap);
  const increCoverMap = {};

  Object.entries(incrementMap).forEach(([increFile, increLines]) => {
    const matchedFile = coverFiles.find((coverFile) => coverFile.endsWith(increFile));

    if (!matchedFile) {
      return;
    }

    const { codeLines, uncoverdCodeLines } = coverMap[matchedFile];
    const increCodeLines = increLines.filter((line) => codeLines.indexOf(line) !== -1);

    if (!increCodeLines.length) {
      return;
    }

    const increUnCoverdCodeLins = increCodeLines.filter((n) => uncoverdCodeLines.indexOf(n) !== -1);

    increCoverMap[increFile] = {
      codeLines,
      uncoverdCodeLines,
      increCodeLines,
      increUnCoverdCodeLins,
    };
  });

  await report(increCoverMap, reporters);

  return increCoverMap;
};

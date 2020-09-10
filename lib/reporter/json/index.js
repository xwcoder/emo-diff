const fs = require('fs/promises');

module.exports = async (coverageMap) => {
  const map = {};

  Object.entries(coverageMap).forEach(([file, info]) => {
    const {
      increCodeLines: lines,
      increUnCoverdCodeLins: unCoverdLines,
    } = info;

    const totalLength = lines.length;
    const unCoverdLength = unCoverdLines.length;
    const coverdLength = totalLength - unCoverdLength;

    map[file] = {
      lines,
      unCoverdLines,
      rate: ((coverdLength / totalLength) * 100).toFixed(2),
    };
  });

  fs.writeFile('./emo_cover.json', JSON.stringify(map));
};

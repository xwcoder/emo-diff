const Table = require('cli-table3');

module.exports = async (coverageMap) => {
  const table = new Table({
    head: ['File', 'Lines', 'Rate'],
  });

  let totalIncreLength = 0;
  let totalCoverdLength = 0;

  Object.entries(coverageMap).forEach(([file, info]) => {
    const {
      increCodeLines: lines,
      increUnCoverdCodeLins: unCoverdLines,
    } = info;

    const totalLength = lines.length;
    const unCoverdLength = unCoverdLines.length;
    const coverdLength = totalLength - unCoverdLength;

    table.push([
      file,
      `${coverdLength}/${totalLength}`,
      `${((coverdLength / totalLength) * 100).toFixed(2)}%`,
    ]);

    totalIncreLength += totalLength;
    totalCoverdLength += coverdLength;
  });

  console.log(`sum: ${totalCoverdLength}/${totalIncreLength}`, `${((totalCoverdLength / totalIncreLength) * 100).toFixed(2)}%`);
  console.log(table.toString());
};

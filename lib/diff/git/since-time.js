const getDiffFromCommand = require('../command');

/**
 * Get diff from git since given time to working tree
 * @param {string} time 2020-08-18
 */
module.exports = async (time = '') => {
  const getCommitIdCommand = `git log --since='${time}' --reverse --pretty=format:%H | sed -n '1p'`;
  const command = `get diff \`${getCommitIdCommand}\` -U0 --no-ext-diff`;
  return getDiffFromCommand(command);
};

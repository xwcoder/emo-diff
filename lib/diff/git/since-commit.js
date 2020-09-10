const getDiffFromCommand = require('../command');

/**
 * Get diff from git since given commit to working tree
 * @param {string} commit git commit id
 */
module.exports = async (commit = '') => getDiffFromCommand(`git diff ${commit} -U0 --no-ext-diff`);

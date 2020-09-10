const creators = {
  file: require('./file'),
  'git-commit': require('./git/since-commit'),
  'git-time': require('./git/since-time'),
  cmd: require('./command'),
};

/**
 * @typedef {Object} Options
 * @property {string} type - one of file|git-commit|git-time|cmd
 * @property {string} file - diff file path.
 * @property {string} commit - commit id or branch name.
 * @property {string} sinceTime - '2020-08-18 23:00:00'.
 * @property {string} cmd - the command to generate diff content.
 */

/**
 * @param {Options} options
 */
module.exports = async (options = {}) => {
  const {
    type,
    file,
    commit,
    sinceTime,
    cmd,
  } = options;

  if (type === 'file') {
    return creators[type](file);
  }

  if (type === 'git-commit') {
    return creators[type](commit);
  }

  if (type === 'git-time') {
    return creators[type](sinceTime);
  }

  if (type === 'cmd') {
    return creators[type](cmd);
  }

  return '';
};

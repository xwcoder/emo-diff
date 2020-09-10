const parsers = {
  'istanbul-json': require('./istanbul/json'),
};

/**
 * @typedef {Object} Options
 * @property {string} type - default is 'istanbul-json', only support 'istanbul-json' now.
 * @property {string} file - coverage file path.
 */

/**
 * @param {Options} options
 */
module.exports = async (options = {}) => {
  const {
    type = 'istanbul-json',
    file,
  } = options;

  return parsers[type](file);
};

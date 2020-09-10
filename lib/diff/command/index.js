const shell = require('shelljs');

module.exports = async (command = '') => {
  const { code, stdout, stderr } = shell.exec(command, { silent: true });
  if (code !== 0) {
    throw new Error(stderr);
  }
  return stdout;
};

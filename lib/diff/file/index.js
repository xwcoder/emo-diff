const fs = require('fs/promises');

module.exports = async (filePath = '') => fs.readFile(filePath, { encoding: 'utf-8' });

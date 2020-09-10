const reportersMap = {
  cli: require('./cli'),
  json: require('./json'),
};

module.exports = async (coverageMap, reporters = []) => {
  const promises = reporters.map((name) => reportersMap[name](coverageMap));
  return Promise.all(promises);
};

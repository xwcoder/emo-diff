#! /usr/bin/env node

const { program } = require('commander');
const { version } = require('../package.json');
const parse = require('../index');

program.version(version)
  .option('--coverage-parser [type]', 'only istanbul-json supported, default is istanbul-json')
  .option('--coverage-file <file>', 'coverage file')
  .option('--diff-creator-type <type>', 'diff content creator, on of file|git-commit|git-time|cmd')
  .option('--diff-file <file>', 'diff file, used when diff-creator-type is file')
  .option('--commit [commit]', 'commit id, used when diff-creator-type is git-commit')
  .option('--sine-time [time]', 'diff from the given time, eg. 2020-08-18 23:00:00')
  .option('--diff-cmd [cmd]', 'the cmd to generate diff content.')
  .option('--reporters [reporters]', 'the reporters type, split by ",", support json cli', '');

program.parse(process.argv);

const options = {
  coverage: {
    type: program.coverageParser || 'istanbul-json',
    file: program.coverageFile,
  },
  diff: {
    type: program.diffCreatorType,
    file: program.diffFile,
    commit: program.commit,
    sinceTime: program.sinceTime,
    cmd: program.diffCmd,
  },
  reporters: program.reporters.split(','),
};

parse(options);

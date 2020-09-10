# emo-diff-cover

A lib/tool to analyze test coverage of diff code lines, analyze from `unified-diff` content.

## Install
```bash
npm i emo-diff-cover
```

## Usage

### API
#### parse(options)
* `options` {Object}
  * `coverage` {Object} The coverage options.
    * `type` {string} Default is 'istanbul-json', only support 'istanbul-json' now.
    * `file` {string} Coverage file path.
  * `diff` {Object} The `unified diff` content options.
    * `type` {string} One of 'file', 'git-commit', 'git-time', 'cmd'.
    * `file` {string} file Diff file path.
    * `commit` {string} Commit id or branch name.
    * `sinceTime` {string} Diff content from given sinceTime, eg '2020-08-18 23:00:00'.
    * `cmd` {string} The command to generate diff content.
  * `reporters` {string[]} Supported 'cli' and 'json' now.

```javascript
const parse = require('emo-diff-cover')
const result = await parse({
  coverage: {
    file: './coverage/coverage-final.json'
  },
  diff: {
    type: 'git-commit',
    commit: 'master'
  },
  reporters: ['cli', 'json'],
})
```

### CLI
```bash
npx emo <options>
```
To get all options using `npx emo --help`

```bash
Usage: emo [options]

Options:
  -V, --version               output the version number
  --coverage-parser [type]    only istanbul-json supported, default is istanbul-json
  --coverage-file <file>      coverage file
  --diff-creator-type <type>  diff content creator, on of file|git-commit|git-time|cmd
  --diff-file <file>          diff file, used when diff-creator-type is file
  --commit [commit]           commit id, used when diff-creator-type is git-commit
  --sine-time [time]          diff from the given time, eg. 2020-08-18 23:00:00
  --diff-cmd [cmd]            the cmd to generate diff content.
  --reporters [reporters]     the reporters type, split by ",", support json cli (default: "")
  -h, --help                  display help for command
```

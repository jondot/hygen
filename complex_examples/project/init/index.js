const cc = require('change-case')
const fs = require('fs')
const path = require('path')
const {pathTo} = require('../../helpers')

const STANDARD_SRC_ROOT = ['client', 'app']
const STANDARD_SRC_DEFAULT = 'src'
const SRC_ROOT =
  STANDARD_SRC_ROOT.find(p => fs.existsSync(`./${p}`)) || STANDARD_SRC_DEFAULT
const DEFAULT_PROJECT_NAME = cc.camel(path.basename(process.cwd()))

module.exports = {
  prompt: ({ prompter, args }) => {
    const beVerbose = args.v || args.verbose
    return prompter
      .prompt([
        {
          type: 'input',
          name: 'projectName',
          default: args.name || DEFAULT_PROJECT_NAME,
          message: 'What is the name of your project?',
        },
        {
          type: 'input',
          name: 'srcDir',
          default: args.src || SRC_ROOT,
          message: 'What is the source directory?',
        },
        {
          type: 'input',
          name: 'subDirs',
          default:
            args.dirs || 'components, models, pages, panes, styles, utils',
          message: 'What sub-directories to use? (Separate by comma)',
        },
        {
          type: 'confirm',
          name: 'createDirs',
          message: 'Create sub-directories with .keep ?',
        },
      ])
      .then(answers => {
        answers.subDirs = answers.subDirs
          .trim()
          .split(/,\s*/)
          .filter(p => p)

        const final = {
          ...args,
          ...answers,
          beVerbose,
        }
        if (beVerbose) console.log('Template Data:', final)
        return final
      })
  },
}

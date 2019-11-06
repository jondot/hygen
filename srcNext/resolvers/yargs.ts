import { HygenResolver } from '../types'
import yargs = require('yargs')

export const resolveYargs: HygenResolver = config => {
  yargs(config.env.argv)
    .scriptName('hygen')
    .version(false)
    .help('help', 'Show Help')
    .alias('help', 'h')
    .option('dry', {
      describe: 'Run all steps but do not generate files',
    })
    .command({
      command: '<generator> <action> [name]',
      describe: 'Generate templates',
      builder: y => {
        return y.positional('generator', {
          describe: 'generator to use',
          type: 'string',
        })
        .positional('action', {
          describe: 'action to use',
          type: 'string',
        })
        .positional('name', {
          describe: 'name for the generated templates',
          type: 'string',
        })
      },
      handler: yargv => console.log(yargv)
    })
    .commandDir(config.env.cwd + '/_templates', {recurse: true, extensions: ['yargs']})


  const yargv = yargs
    .fail((msg, err) => {
      console.log(msg)
      console.log(err)
      console.log(yargs.showHelp())
      console.log('===> actionsAvailable <===')
    })
    .argv

  config.args = { ...yargv, ...(config.args || {}) }
  // TODO or { ...(config.params || {}), ...yargv }
  console.log('yargv', yargv)
  return Promise.resolve(config)
}

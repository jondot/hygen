import { HygenResolver } from '../types'
import yargs = require('yargs')

export const resolveYargs: HygenResolver = config => {
  const allActions = Object.entries(config.generator.summary).reduce((all, [gen, actions]) => {
    Object.keys(actions).forEach(action => all.push({
      command: `\$0 ${gen} ${action} [name]`,
      describe: `$0 ${gen} ${action} <name> [options]`,
      builder: y => {
        return y.positional('name', {
            describe: 'name for the generated templates',
            type: 'string',
          })
      },
      handler: yargv => console.log(yargv)
    }))
    return all as Array<[string, string, number]>
  }, [])

  yargs(config.env.argv)
    .scriptName('hygen')
    .version(false)
    .help('help', 'Show Help')
    .alias('help', 'h')
    .option('dry', {
      describe: 'Run all steps but do not generate files',
    })
    // .commandDir(config.env.cwd + '/_templates', {recurse: true, extensions: ['yargs']})

  allActions.forEach((cmd) => yargs.command(cmd))

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

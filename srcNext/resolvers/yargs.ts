import { HygenResolver } from '../types'
import yargs = require('yargs')

export const resolveYargs: HygenResolver = config => {
  const yargv = yargs(config.env.argv)
    .scriptName('hygen')
    .version(false)
    .help('help', 'Show Help')
    .showHelpOnFail(true, 'Must provide generator and action')
    .alias('help', 'h')
    .option('dry', {
      describe: 'Run all steps but do not generate files',
    })
    .command(
      '$0 <generator> <action> [name]',
      'generate templates from generator/action',
      //@ts-ignore
      yargs => {
        yargs
          .usage('$0 [generator] [action] <name> [options]')
          .positional('generator', {
            describe: 'generator (_templates/myGenerator)',
            type: 'string',
          })
          .positional('action', {
            describe: 'action (_templates/myGenerator/myAction)',
            type: 'string',
          })
          .positional('name', {
            describe: 'name for the generated templates',
            type: 'string',
          })
      },
      () => {
        console.log('command handled')
      },
    )
    .commandDir(config.env.cwd + '/_templates', {recurse: true, extensions: ['yargs']})
    .demandCommand(1,2,'You must supply a <generator> and an <action>')
    .check(yargv => {
      if (!yargv.generator) throw new Error('No generator')
      if (!yargv.action) throw new Error('No action')
      if (yargv.generator && !(config.generator.summary[yargv.generator])) {
        throw new Error(`No such generator: ${yargv.generator}`)
      }
      if (yargv.action && !(config.generator.summary[yargv.generator][yargv.action])) {
        throw new Error(`generator: ${yargv.generator} has no action ${yargv.action}`)
      }
      return true
    })
    .fail((msg, _, yargs) => {

      config.tools.logger.warn(msg.startsWith('Not enough') ? 'You must supply a <generator> and an <action>' : msg)
      // console.error(err)
      console.log(yargs.help())
      process.exit(1)
    })
    .argv

  config.args = { ...yargv, ...(config.args || {}) }
  // TODO or { ...(config.params || {}), ...yargv }
  return Promise.resolve(config)
}

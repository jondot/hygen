#!/usr/bin/env node
import { HygenBuildConfig, HygenResolver } from './types'

export const hygenYargs: HygenResolver = (config: HygenBuildConfig) => {
  const yargv = require('yargs/yargs')(config.env.argv)
    .scriptName('hygen')
    .version(false)
    .help('help', 'Show Help')
    .alias('help', 'h')
    .option('dry', {
      describe: 'Run all steps but do not generate files',
    })
    .command(
      '$0 <generator> <action> [name]',
      'generate templates from generator/action',
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
      yargv => yargv,
    )
    .fail((msg, err, yargs) => {
      console.log(msg)
      console.log(err)
      console.log(yargs.showHelp())
      console.log('===> actionsAvailable <===')
    }).argv

  config.params = { ...yargv, ...(config.params || {}) }
  // TODO or { ...(config.params || {}), ...yargv }

  return Promise.resolve(config)
}

const walk = require('ignore-walk')
export const availableActions = async () =>
  await walk({ path: '_templates' })
    .then(files => files.reduce(
      (actions, file) => {
        const [generator, action] = file.split('/')
        actions[generator] = actions[generator] || {}
        actions[generator][action] = true
        return actions
      },
      {},
    ))
    // .then(f => {console.log('actions', f); return f})
    .then(generators =>
      Object.entries(generators).map(([generator, actions]) =>
        `${generator}: ${Object.keys(actions).sort().join(', ')}`,
      ),
    )
// .then(f => {console.log('generators', f); return f})


// console.log(availableActions())
import { HygenConfig, HygenResolver } from '../../hygen'
import { chainPromise } from '../../utils'
import yargsParser from 'yargs-parser'

const chainCommands = (baseYargs, commands) =>
  commands.reduce((yargs, command) => yargs.command)

export const yargsResolver = (config: HygenConfig): Promise<HygenConfig> => {
  // resolve preYargs hooks
  // setup basic parser
  const parser = yargsParser(config.env.argv)
    .scriptName('hygen')
    .env('HYGEN')
    .version(false)
    .usage('$0 [global-args] <generator> <action> <name> [args]')

  config.yargs.parser = chainCommands(parser, [
    // help system
    // log/verbosity system
    // global options
    // ...config.hooks.yargsOptions
  ])
  config.params.yargs = config.yargs.parser.argv
  // assign argv to config.params.argv
  // resolve postYargs hooks
  return (Promise.resolve(config))
}

const resolver: HygenResolver = {
  resolver: yargsResolver,
  name: 'Yargs Resolver',
  hooks: ['preYargs', 'postYargs'],
}

export default yargsResolver

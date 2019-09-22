import { HygenConfig, HygenResolver } from '../hygen'
import { chainPromise } from '../utils'
import yargs from 'yargs-parser'

export const yargsResolver = (config: HygenConfig): Promise<HygenConfig> => {
  // resolve preYargs hooks
  // setup basic parser
  const parser = yargs(config.env.argv)
    .scriptName('hygen')
    .env("HYGEN")
    .usage('$0 [global-args] <generator> <action> <name> [args]')
    .options


  // resolve postYargs hooks
  return Promise.resolve(config)
}

const resolver: HygenResolver = {
  resolver: yargsResolver,
  name: 'Yargs Resolver',
  hooks: ['preYargs', 'postYargs'],
}

export default yargsResolver

import { HygenConfig, HygenResolver } from '../hygen'
import { chainPromise } from '../utils'
import yargs from 'yargs-parser'

export const yargsResolver = (config: HygenConfig): Promise<HygenConfig> => {
  // resolve preYargs hooks
  // setup basic parser
  const parser =


  // resolve postYargs hooks
  return Promise.resolve(config)
}

const resolver: HygenResolver = {
  resolver: yargsResolver,
  name: 'Yargs Resolver',
  hooks: ['preYargs', 'postYargs'],
}

export default yargsResolver

import { HygenConfig, HygenResolver } from '../hygen/index'
import {yargsResolver} from './yargs'
import { Logger } from '../utils'
/* configResolver is responsible for finding and loading configuration files
   and setting sensible defaults and assigning tools for the rest of the
   hygenConfig
  */
const defaultsResolvers = require('./resolvers/defaults')
const moduleResolvers =   require('./resolvers/module')

export const configResolver = (config: HygenConfig): Promise<HygenConfig> => {

  return defaultsResolvers(config)
    .then(fileResolver('configFiles'))
    .then(yargsResolver)
    .then(hooksResolver('postConfig'))

}

const resolver: HygenResolver = {
  resolver: configResolver,
  name: 'Modules ',
  hooks: ['postConfig'],
}

export default resolver

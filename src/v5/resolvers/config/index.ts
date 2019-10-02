import { HygenConfig, HygenResolver } from '../../hygen'
import {yargsResolver} from '../yargs'
import { Logger } from '../../utils'
import { fileResolver } from '../file'
import { createHooksResolver } from '../hooks'

/* configResolver is responsible for finding and loading configuration files
   and setting sensible defaults and assigning tools for the rest of the
   hygenConfig
  */

const defaultsResolvers = require('./resolvers/defaults')
const moduleResolvers =   require('./resolvers/module')
export const configResolver = (config: HygenConfig): Promise<HygenConfig> => {
  const hooksResolver = createHooksResolver('postConfig')

  return defaultsResolvers(config)
    .then(fileResolver('configFiles'))
    .then(yargsResolver)
    .then(hooksResolver)
}

const resolver: HygenResolver = {
  resolve: configResolver,
  name: 'Modules ',
  hooks: ['postConfig'],
}

export default resolver

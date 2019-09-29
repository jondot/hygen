// import type { HygenConfig, Resolver, ChainedVars } from './types'
import { chainPromise } from './utils'
import { HygenConfig, HygenResolver } from './hygen'

const masterResolvers: HygenResolver[] = [
  require('./resolvers/defaults'),
  require('./resolvers/config'),
  require('./resolvers/module'),
  require('./resolvers/generator'),
  require('./resolvers/params'),
  require('./resolvers/templates'),
  require('./resolvers/directives'),
  require('./resolvers/render'),
]

export const hygen = async (config: HygenConfig): Promise<HygenConfig | void>  =>
  chainPromise(Promise.resolve(config), masterResolvers).catch(err => {
    config.logger.error(err.toString())
    config.logger.debug('======== details ========')
    config.logger.debug(err.stack)
    config.logger.debug('=========================')
  })

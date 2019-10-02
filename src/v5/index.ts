// import type { HygenConfig, Resolver, ChainedVars } from './types'
import { createResolverChain } from './utils'
import { HygenConfig, HygenResolver } from './hygen'

const masterResolvers: HygenResolver[] = [
  require('./resolvers/defaults'),
  require('./resolvers/config'),
  require('./resolvers/module'),
  require('./resolvers/generator'),
  require('./resolvers/params'),
  require('./resolvers/templates'),
  // these could be one step
  require('./resolvers/directives'),
  require('./resolvers/render'),
]
const hygenChain = createResolverChain(masterResolvers)
export const hygen = async (config: HygenConfig): Promise<any>  => {
  hygenChain(config).catch(err => {
    config.logger.error(err.toString())
    config.logger.trace('======== details ========')
    config.logger.trace(err.stack)
    config.logger.trace('=========================')
  })
}

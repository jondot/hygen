// @flow
import type { HygenConfig, Resolver, ChainedVars } from './types'
import { chainPromise } from './utils'

const masterResolvers: Array<Resolver> = [
  require('./resolvers/config'),
  require('./resolvers/module'),
  require('./resolvers/yargs'),
  require('./resolvers/generator'),
  require('./resolvers/params'),
  require('./resolvers/templates'),
  require('./resolvers/directives'),
  require('./resolvers/render'),
]

const hygen = async (config: HygenConfig): Promise<HygenConfig> =>
  chainPromise(Promise.resolve(defaultConfig), masterResolvers).catch(err => {
    config.logger.error(err.toString())
    config.logger.debug('======== details ========')
    config.logger.debug(err.stack)
    config.logger.debug('=========================')
  })

module.exports = { hygen }

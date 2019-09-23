import { HygenConfig, HygenResolver } from '../hygen'
import { chainPromise } from '../utils'

export const defaultsResolver = (config: HygenConfig): Promise<HygenConfig> => {
  // setup yargsParser
  // merge logModule
  // setup logger
  // merge helpModule
  // merge tools
  // merge helpers

  yargsResolver(config)
    .then(loggerResolver)
    .then(helpModule)
    .then(toolsResolver)
    .then(helpersResolver)
    .then(hooksResolver('postDefaults'))


  // resolve postDefaults hooks
  return Promise.resolve(config)
}

const resolver: HygenResolver = {
  resolver: defaultsResolver,
  name: 'Defaults Resolver',
  hooks: ['preDefaults', 'postDefaults'],
}

export default resolver

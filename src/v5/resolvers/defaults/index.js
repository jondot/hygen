import { HygenConfig, HygenResolver } from '../hygen'
import { chainPromise } from '../utils'

export const defaultsResolver = (config: HygenConfig): Promise<HygenConfig> => {
  yargsResolver(config)
    .then(loggerResolver)
    .then(helpModule)
    .then(toolsResolver)
    .then(helpersResolver)
    .then(hooksResolver('postDefaults'))
}

const resolver: HygenResolver = {
  resolver: defaultsResolver,
  name: 'Defaults Resolver',
  hooks: ['postDefaults'],
}

export default resolver

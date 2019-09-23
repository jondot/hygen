import { HygenConfig, HygenResolver } from '../hygen'
import { chainPromise } from '../utils'

export const hooksResolver = (config: HygenConfig): Promise<HygenConfig> => {
  // resolve preHooks hooks

  // resolve postHooks hooks
  return Promise.resolve(config)
}

const resolver: HygenResolver = {
  resolver: hooksResolver,
  name: 'Hooks Resolver',
  hooks: ['preHooks', 'postHooks'],
}

export default resolver

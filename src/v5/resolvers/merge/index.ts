import { HygenConfig, HygenResolver } from '../hygen'
import { chainPromise } from '../utils'

export const mergeResolver = (config: HygenConfig): Promise<HygenConfig> => {
  // resolve preMerge hooks

  // resolve postMerge hooks
  return Promise.resolve(config)
}

const resolver: HygenResolver = {
  resolver: mergeResolver,
  name: 'Merge Resolver',
  hooks: ['preMerge', 'postMerge'],
}

export default resolver

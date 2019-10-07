import { HygenConfig, HygenResolver } from 'hygen'
import { createResolverChain } from 'utils'

export const createHooksResolver = (hook: string): HygenResolver => {
  return (config: HygenConfig): Promise<HygenConfig> => {
    if (config.hooks && config.hooks[hook])
      return createResolverChain(config.hooks[hook])(config)
    else return Promise.resolve(config)
  }
}

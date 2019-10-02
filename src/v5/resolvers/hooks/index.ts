import { HygenResolver } from '../../hygen'
import { createResolverChain } from '../../utils'

export const createHooksResolver = (hook: string): HygenResolver => {
  return config => {
    return createResolverChain(config.hooks[hook])(config)
  }
}

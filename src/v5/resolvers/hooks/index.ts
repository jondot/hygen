import { HygenConfig } from '../../hygen'
import { createResolverChain } from '../../utils'
import { CreateHooksChainFn } from '../../hygen/hooks'

export const createHooksChain: CreateHooksChainFn = (hook, config) =>
  createResolverChain(config.hooks[hook])(config)

export const createHooksResolver = (hook)  => {
  return config => {
    return {
      resolve: createHooksChain(hook, config),
      name: `Hooks resolver: ${hook}`,
      hooks: ['preHooks', 'postHooks'],
    }
  }
}

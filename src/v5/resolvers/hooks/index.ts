import {
  HygenConfig,
  HygenResolver,
  CreateHygenResolver,
  ResolverFn,
  CreateHooksChain,
} from '../../hygen'
import { createResolverChain } from '../../utils'

export const createHooksChain = (hook: string, config: HygenConfig):  =>
  createResolverChain(config.hooks[hook])(config)

export const createHooksResolver = hook => {
  return config => {
    return {
      resolve: createHooksChain(hook, config),
      name: `Hooks resolver: ${hook}`,
      hooks: ['preHooks', 'postHooks'],
    }
  }
}

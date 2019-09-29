import { HygenConfig, HygenResolver } from '../../hygen'
import { chainPromise } from '../../utils'

export const createHooksResolver = (hook: string): HygenResolver =>
  (config: HygenConfig, ): Promise<HygenConfig> => ({
    resolve: chainPromise(Promise.resolve(config), config.hooks[hook]),
    name: `Hooks resolver: ${hook}`,
    hooks: ['preHooks','postHooks'],

  })


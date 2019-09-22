import { HygenConfig, ResolverFn } from '../hygen/index'
// TODO why won't ../hygen work for import?

export const modulesResolver = (config: HygenConfig): Promise<HygenConfig> => {
  // run preModulesHooks
  // use config.modules create array of promises to load module
  // promise.all load array, run perModulesHooks
  // catch failed module loads
  // merge all modules
  // run postModulesHooks
  return Promise.resolve(config)
}

const resolver: HygenConfig = {
  resolver: modulesResolver,
  name: 'Modules Resolver',
  hooks: ['preModule', 'perModule', 'postModule'],
}

export default resolver

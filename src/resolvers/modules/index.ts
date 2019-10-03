import { HygenConfig, ResolverFn } from '../hygen/index'
import { hooksResolver } from '../hooks'
import { fileResolver } from '../file'
import {mergeResolver} from '../merge'
import yargsResolver from '../yargs'
// TODO why won't ../hygen work for import?

export const modulesResolver = (config: HygenConfig): Promise<HygenConfig> =>
  hooksResolver('preModule')(config)
    .then(config => {
      const modules = config.modules.map(module => {
        if (typeof module === 'string') {
          return fileResolver(module)
        } else return Promise.resolve(module)
      })
      return Promise.all(modules)
    })
    // .catch() // fail to load module
    .then(modules => mergeResolver(modules)())
    .then(yargsResolver)
    .then(hooksResolver('postModule'))

const resolver: HygenConfig = {
  resolver: modulesResolver,
  name: 'Modules Resolver',
  hooks: ['preModule', 'postModule'],
}

export default resolver

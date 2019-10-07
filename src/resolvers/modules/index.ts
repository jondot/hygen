import { HygenConfig} from 'hygen'
import { createHooksResolver } from 'resolvers/hooks'
import { fileResolver } from 'resolvers/file'
import { mergeConfig } from 'utils'
import yargsResolver from '../yargs'
import { HygenResolver } from '../../hygen'
// TODO why won't ../hygen work for import?

export const modulesResolver = (config: HygenConfig): Promise<HygenConfig> =>
  createHooksResolver('preModule')(config)
    .then(
      (config: HygenConfig): Promise<HygenConfig> => {
        const modules = config.modules.map(
          (module: string | HygenResolver): Promise<HygenConfig> => {
            if (typeof module === 'string') {
              return fileResolver(module)
            } else return Promise.resolve(module)
          },
        )
        return Promise.all(modules)
      },
    )
    // .catch() // fail to load module
    .then(
      (modules: Array<HygenResolver>): HygenResolver =>
        mergeResolver(modules)(),
    )
    .then(yargsResolver)
    .then(createHooksResolver('postModule'))

const resolver: HygenConfig = {
  resolver: modulesResolver,
  name: 'Modules Resolver',
  hooks: ['preModule', 'postModule'],
}

export default resolver

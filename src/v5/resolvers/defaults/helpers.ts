import { HygenConfig, HygenResolver } from '../../hygen'
import { chainPromise } from '../../utils'

export const helpersResolverResolver = (config: HygenConfig): Promise<HygenConfig> => {
  // resolve preHelpersresolver hooks

  // resolve postHelpersresolver hooks
  return Promise.resolve(config)
}

const resolver: HygenResolver = {
  resolver: helpersResolverResolver,
  name: 'Helpersresolver Resolver',
  hooks: ['preHelpersresolver', 'postHelpersresolver'],
}

export default resolver

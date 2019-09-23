import { HygenConfig, HygenResolver } from '../../hygen'
import { chainPromise } from '../../utils'

export const toolsResolverResolver = (config: HygenConfig): Promise<HygenConfig> => {
  // resolve preToolsresolver hooks

  // resolve postToolsresolver hooks
  return Promise.resolve(config)
}

const resolver: HygenResolver = {
  resolver: toolsResolverResolver,
  name: 'Toolsresolver Resolver',
  hooks: ['preToolsresolver', 'postToolsresolver'],
}

export default resolver

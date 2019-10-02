import { HygenConfig, HygenResolver } from '../../hygen'
import { chainPromise } from '../../utils'

export const toolsResolver = (config: HygenConfig): Promise<HygenConfig> => {
  // resolve preToolsresolver hooks

  // resolve postToolsresolver hooks
  return Promise.resolve(config)
}

const resolver: HygenResolver = {
  resolver: toolsResolver,
  name: 'Toolsresolver Resolver',
  hooks: ['preToolsresolver', 'postToolsresolver'],
}

export default resolver

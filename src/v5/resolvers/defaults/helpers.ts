import { HygenConfig, HygenResolver } from '../../hygen'
import { chainPromise } from '../../utils'

export const helpersResolver = (config: HygenConfig): Promise<HygenConfig> => {
  // resolve preHelpersresolver hooks

  // resolve postHelpersresolver hooks
  return Promise.resolve(config)
}

const resolver: HygenResolver = {
  resolver: helpersResolver,
  name: 'Helpersresolver Resolver',
  hooks: ['preHelpersresolver', 'postHelpersresolver'],
}

export default resolver

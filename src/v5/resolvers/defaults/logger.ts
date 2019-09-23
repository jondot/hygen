import { HygenConfig, HygenResolver } from '../../hygen'
import { chainPromise } from '../../utils'

export const loggerResolver = (config: HygenConfig): Promise<HygenConfig> => {
  // resolve preLogger hooks

  // resolve postLogger hooks
  return Promise.resolve(config)
}

const resolver: HygenResolver = {
  resolver: loggerResolver,
  name: 'Logger Resolver',
  hooks: ['preLogger', 'postLogger'],
}

export default resolver

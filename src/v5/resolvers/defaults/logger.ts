import { HygenConfig, HygenResolver } from '../../hygen'
import { chainPromise } from '../../utils'
import mkHooksReducer from '../hooks'

export const loggerResolver = (config: HygenConfig): Promise<HygenConfig> => {
  mkHooksReducer('preLogger')(config)
    .then(mergeLogModule)
    .then(yargsResolver)
    .then(setupLogger)

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

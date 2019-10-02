import { HygenConfig, HygenResolver } from '../../hygen'
import { chainPromise } from '../../utils'
import mkHooksReducer from '../hooks'
import yargsResolver from '../yargs'

export const loggerResolver = (config: HygenConfig): Promise<HygenConfig> => {
  mkHooksReducer('preLogger')(config)
    .then(mergeLogModule)
    .then(yargsResolver)
    .then(setupLogger)

  // resolve preLogger hooks

  // resolve postLogger hooks
  return Promise.resolve(config)
}


export default loggerResolver(

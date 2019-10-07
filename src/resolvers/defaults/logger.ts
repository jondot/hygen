import { HygenConfig } from 'hygen'
import { chainPromise } from 'utils'
import { createHooksResolver } from '../hooks'
import yargsResolver from '../yargs'

export const loggerResolver = (config: HyQgenConfig): Promise<HygenConfig> => {
  createHooksResolver('preLogger')(config)
    .then(mergeLogModule)
    .then(yargsResolver)
    .then(setupLogger)
    .then(createHooksResolver('postLogger'))

  // resolve preLogger hooks

  // resolve postLogger hooks
  return Promise.resolve(config)
}

export default loggerResolver

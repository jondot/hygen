import { HygenConfig, HygenResolver } from '../hygen'
import { chainPromise } from '../utils'

export const fileResolver = (config: HygenConfig): Promise<HygenConfig> => {
  // resolve preFile hooks

  // resolve postFile hooks
  return Promise.resolve(config)
}

const resolver: HygenResolver = {
  resolver: fileResolver,
  name: 'File Resolver',
  hooks: ['preFile', 'postFile'],
}

export default resolver

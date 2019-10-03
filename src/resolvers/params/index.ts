import { HygenConfig, HygenResolver } from '../hygen'
import { chainPromise } from '../utils'

export const paramsResolver = (config: HygenConfig): Promise<HygenConfig> => {
  // resolve preParamsHooks
  // resolve paramsHooks
  // resolve

  // resolve postParams hooks
  return Promise.resolve(config)
}

const resolver: HygenResolver = {
  resolver: paramsResolver,
  name: 'Params Resolver',
  hooks: ['preParams', 'postParams'],
}

export default resolver

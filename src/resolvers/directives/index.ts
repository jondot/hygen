import { HygenConfig, HygenResolver } from '../hygen'
import { chainPromise } from '../utils'

export const directivesResolver = (config: HygenConfig): Promise<HygenConfig> => {
  // resolve preDirectives hooks

  // resolve postDirectives hooks
  return Promise.resolve(config)
}

const resolver: HygenResolver = {
  resolver: directivesResolver,
  name: 'Directives Resolver',
  hooks: ['preDirectives', 'postDirectives'],
}

export default directivesResolver

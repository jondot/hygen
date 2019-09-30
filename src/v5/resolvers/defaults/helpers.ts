import { HygenConfig, HygenResolver, ResolverFn } from '../../hygen'
import { createResolverChain } from '../../utils'

export const helpersResolver: ResolverFn = config => {
  // resolve preHelpersresolver hooks

  // resolve postHelpersresolver hooks
  return Promise.resolve(config)
}

const resolver: HygenResolver = {
  resolve: helpersResolver,
  name: 'Helpersresolver Resolver',
  hooks: ['preHelpersresolver', 'postHelpersresolver'],
}

export default resolver

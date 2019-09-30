import {
  ChainResolver,
  CreateResolverChainFn,
} from '../hygen/utils'

export const chainResolver: ChainResolver = async (chain, resolver) => chain.then(resolver)
export const createResolverChain: CreateResolverChainFn = resolvers =>
  async config => resolvers.reduce(chainResolver, Promise.resolve(config))



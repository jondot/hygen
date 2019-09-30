import { HygenConfig, ResolverFn } from '../hygen'

export const chainResolver = (chain: Promise<HygenConfig>, resolver: ResolverFn): Promise<HygenConfig> => chain.then(resolver)
export const createResolverChain = (resolvers: ResolverFn[]): ResolverFn =>
  async (config: HygenConfig): Promise<HygenConfig> => resolvers.reduce(chainResolver, Promise.resolve(config))



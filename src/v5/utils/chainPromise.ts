import { HygenConfig, HygenResolver } from '../hygen'

export const chainResolver = (
  chain: Promise<HygenConfig>,
  resolver: HygenResolver,
): Promise<HygenConfig> => chain.then(resolver)

export const createResolverChain = (
  resolvers: HygenResolver[],
): HygenResolver => async (config: HygenConfig): Promise<HygenConfig> =>
  resolvers.reduce(chainResolver, Promise.resolve(config))

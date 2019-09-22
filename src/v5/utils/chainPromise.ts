import { HygenConfig, HygenResolver } from '../hygen/index'

export const chainPromise = async (
  firstLink: Promise<HygenConfig>,
  resolvers: Array<HygenResolver>,
): Promise<HygenConfig> => {
  return resolvers.reduce(
    async (
      chain: Promise<HygenConfig>,
      resolver: HygenResolver,
    ): Promise<HygenConfig> => {
      return chain.then(resolver.resolve)
    },
    firstLink,
  )
}

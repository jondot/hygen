// @flow
import type {HygenConfig, Resolver} from 'src/types'

const chainPromise = async (
  firstLink: Promise<HygenConfig>,
  resolvers: Array<Resolver>,
): Promise<HygenConfig> => {
  return resolvers.reduce(
    async (
      chain: Promise<HygenConfig>,
      resolver: Resolver,
    ): Promise<HygenConfig> => {
      return chain.then(resolver.resolve)
    },
    firstLink,
  )
}

module.exports = { chainPromise }

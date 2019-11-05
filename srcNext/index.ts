import { HygenResolver } from './types'
import {
  resolveEnv,
  resolveIo,
  resolveTools,
  resolveHelpers,
  resolveConfig,

} from './resolvers'

const resolvers = [
  resolveEnv, resolveIo, resolveTools, resolveHelpers, resolveConfig
 ]

export const runner: HygenResolver = async (initial) => resolvers.reduce(
  (main, resolver) => main.then(resolver).then(mod => {return mod}),
  Promise.resolve(initial),
)

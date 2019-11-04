import { HygenResolver } from './types'
import {
  resolveEnv,
  resolveIo,
  resolveTools,
  resolveHelpers,
  resolveConfig
  // configResolver,
  // generatorResolver,
  // promptResolver,
  // paramsResolver,
  // renderResolver,
} from './resolvers'

const resolvers = [
  resolveEnv, resolveIo, resolveTools, resolveHelpers, resolveConfig
 ]

export const runner: HygenResolver = async (initial) => resolvers.reduce(
  (main, resolver) => main.then(resolver),
  Promise.resolve(initial),
)

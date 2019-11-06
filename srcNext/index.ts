import { HygenResolver } from './types'
import {
  resolveEnv,
  resolveIo,
  resolveTools,
  resolveHelpers,
  resolveConfig,
  resolveGenerator,
  resolveYargs,
  resolveArray,
} from './resolvers'

const initResolver = resolveArray('inits')

const resolvers = [
  resolveEnv,
  resolveIo,
  resolveTools,
  resolveHelpers,
  resolveConfig,
  resolveGenerator,
  resolveYargs,
  initResolver
]

export const runner: HygenResolver = async (initial) => resolvers.reduce(
  (main, resolver) => main.then(resolver).then(mod => {
    return mod
  }),
  Promise.resolve(initial),
)

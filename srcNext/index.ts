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

const resolveInit = resolveArray('inits')

const resolvers = [
  resolveEnv,
  resolveIo,
  resolveTools,
  resolveHelpers,
  resolveConfig,
  resolveInit,
  resolveYargs,
  resolveGenerator,
]

export const runner: HygenResolver = async (initial) => resolvers.reduce(
  (main, resolver) => main.then(resolver).then(mod => {
    console.log(mod.args)
    return mod
  }),
  Promise.resolve(initial),
)

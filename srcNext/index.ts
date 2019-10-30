import { HygenResolver } from './types'
import {
  configResolver,
  generatorResolver,
  promptResolver,
  paramsResolver,
  renderResolver,
} from './resolvers'

const resolvers = [configResolver, generatorResolver, promptResolver, paramsResolver, renderResolver]

export const runner: HygenResolver = async (initial) => resolvers.reduce(
  (main, resolver) => main.then(resolver),
  Promise.resolve(initial),
)

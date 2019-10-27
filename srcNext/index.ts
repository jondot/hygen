import { HygenResolver } from './types'

const noopResolver: HygenResolver = (config) => Promise.resolve(config)

const configResolver = noopResolver
const generatorResolver = noopResolver
const promptResolver = noopResolver
const paramsResolver = noopResolver
const renderResolver = noopResolver

const resolvers = [configResolver, generatorResolver, promptResolver, paramsResolver, renderResolver]

export const runner: HygenResolver = async (initial) => resolvers.reduce(
  (main, resolver) => main.then(resolver),
  Promise.resolve(initial),
)

import { HygenConfig, HygenResolver } from '../../hygen'
import yargsResolver from '../yargs'
import { loggerResolver } from './logger'
import { helpModuleResolver } from './helpModule'
import { createHooksResolver } from '../hooks'
import { toolsResolver } from './tools'
import { helpersResolver } from './helpers'
import { createResolverChain } from '../../utils'

export const defaultsResolver = createResolverChain([
  yargsResolver,
  loggerResolver,
  helpModuleResolver,
  toolsResolver,
  helpersResolver,
  createHooksResolver('postDefaults'),
])

export default defaultsResolver

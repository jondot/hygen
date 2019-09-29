import { HygenConfig, HygenResolver } from '../hygen'
import yargsResolver from '../yargs'
import { loggerResolver } from './logger'
import  {helpModuleResolver} from './helpModule'
import { createHooksResolver } from '../hooks'
import { toolsResolver } from './tools'
import { helpersResolver } from './helpers'

export const defaultsResolver = (config: HygenConfig): Promise<HygenConfig> => {
  yargsResolver(config)
    .then(loggerResolver)
    .then(helpModuleResolver)
    .then(toolsResolver)
    .then(helpersResolver)
    .then(createHooksResolver('postDefaults'))
}

const resolver: HygenResolver = {
  resolver: defaultsResolver,
  name: 'Defaults Resolver',
  hooks: ['postDefaults'],
}

export default resolver

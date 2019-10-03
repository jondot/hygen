import { HygenConfig, HygenResolver } from '../../hygen'
import { chainPromise } from '../../utils'

export const helpModuleResolver = (config: HygenConfig): Promise<HygenConfig> => {
  // resolve preHelpmodule hooks

  // resolve postHelpmodule hooks
  return Promise.resolve(config)
}

const resolver: HygenResolver = {
  resolver: helpModuleResolver,
  name: 'Helpmodule Resolver',
  hooks: ['preHelpmodule', 'postHelpmodule'],
}

export default resolver

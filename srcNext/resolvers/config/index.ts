import {
  GeneratorConfig, HygenConfig,
  HygenResolver,
  UserConfig,
} from '../../types'
import { fetchEnv } from './env'
import { fetchTools } from './tools'
import { fetchGenerators } from './generators'
import { fetchUser } from './user'

export const configResolver: HygenResolver = (config) => {
  config.env = config.env || fetchEnv()
  config.tools = config.tools || fetchTools()
  config.modules = []


  // build tools config
  // find template files, config files
  return Promise.all([
    fetchGenerators(config),
    fetchUser(config),
  ])
    .catch(err => console.error(err))
    .then((resultsArr: [Partial<GeneratorConfig>, Array<UserConfig>]): HygenConfig => {
      const [generators, userConfig] = resultsArr
      config.generators = generators
      config.modules = userConfig
      return config

    }).then(() => config)
}
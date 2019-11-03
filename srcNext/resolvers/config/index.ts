import {
  GeneratorSummaryConfig,
  HygenBuildConfig,
  HygenResolver,
  UserConfig,
} from '../../types'
import { fetchEnv } from './env'
import { fetchTools } from './tools'
import { fetchGenerators } from './generators'
import { fetchUser } from './user'

export let configResolver: HygenResolver
configResolver = (config) => {
  config.env = config.env || fetchEnv()
  config.tools = config.tools || fetchTools()

  // build tools config
  // find template files, config files
  return Promise.all([
    fetchGenerators(config),
    fetchUser(config),
  ])
    .catch(err => {
      console.error(err)
      throw new Error(err)
    })
    .then((resultsArr: [GeneratorSummaryConfig, Array<UserConfig>]): HygenBuildConfig => {
      // @ts-ignore
      const [generator, userConfig] = resultsArr
      console.log('configResolver', generator.summary.gen)
      // config.generator = summary
      config.modules = userConfig
      config.generator = generator
      return config

    }).then(() => config)
}
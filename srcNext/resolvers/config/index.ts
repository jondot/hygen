import { HygenResolver } from '../../types'
import { fetchConfigFiles } from './configFiles'
import { GeneratorSummaryConfig, HygenBuildConfig, UserConfig } from '../../types'
import { fetchGenerators } from './generators'

export const configResolver: HygenResolver = (config) => Promise.all([
  fetchGenerators(config),
  fetchConfigFiles(config),
])
  .catch(err => {
    console.error(err)
    throw new Error(err)
  })
  .then((resultsArr: [GeneratorSummaryConfig, Array<UserConfig>]): HygenBuildConfig => {
    // @ts-ignore
    const [generator, userConfig] = resultsArr
    // config.generator = summary
    config.modules = userConfig
    config.generator = generator
    return config

  })
  .then(config => Promise.resolve(config))

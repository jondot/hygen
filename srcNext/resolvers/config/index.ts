import { HygenResolver } from '../../types'
import { fetchConfigFiles } from './configFiles'
import { GeneratorSummaryConfig, HygenBuildConfig } from '../../types'
import { fetchGenerators } from './generators'
import { mergeConfig } from '../common'


export const resolveConfig: HygenResolver = (config) => Promise.all([
  fetchGenerators(config),
  fetchConfigFiles(config),
])
  .catch(err => {
    // console.error('resolveConfig', err)
    throw new Error(err)
  })
  .then((resultsArr: [GeneratorSummaryConfig, Array<HygenBuildConfig>]): Promise<HygenBuildConfig> => {
    // @ts-ignore
    const [generator, mods] = resultsArr
    config.generator = generator

    return Promise.resolve(mods.reduce((config, mod) => mergeConfig(config, mod), config))
  })

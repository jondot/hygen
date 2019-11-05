import { HygenResolver } from '../../types'
import { fetchConfigFiles } from './configFiles'
import { GeneratorSummaryConfig, HygenBuildConfig } from '../../types'
import { fetchGenerators } from './generators'

const mergeObjectKeys = ['env', 'io', 'tools', 'helpers', 'generator']
const mergeArrayKeys = ['init', 'prompt', 'params']

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
    console.log('resolveConfig','MODS',resultsArr)
    config.generator = generator

    mods.forEach((mod: HygenBuildConfig): void => {
      console.log('mod', mod)
      mergeObjectKeys.forEach(section => {
        if (!(mod[section])) return
        console.log('mergeObject', mod, section)
        config[section] = { ...config[section], ...mod[section] }
      })
      mergeArrayKeys.forEach(section => {
        if (!mod[section]) return
        if (!config[section]) config[section] = []
        if (!Array.isArray(mod[section])) {
          config[section].push(...mod[section])
          return
        }
        config[section].push(mod[section])
      })
    })

    return Promise.resolve(config)
  })

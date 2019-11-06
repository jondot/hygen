import { HygenBuildConfig, HygenResolver } from '../types'

export const noopResolver: HygenResolver = (config) => Promise.resolve(config)
const mergeObjectKeys = ['env', 'io', 'tools', 'helpers', 'generator']
const mergeArrayKeys = ['init', 'prompts', 'params', 'yargs']

export const mergeConfig = (config: HygenBuildConfig, mod: HygenBuildConfig): HygenBuildConfig => {

  mergeObjectKeys.forEach(section => {
    if (!(mod[section])) return
    config[section] = { ...config[section], ...mod[section] }
  })
  mergeArrayKeys.forEach(section => {
    if (!mod[section]) return
    if (!config[section]) config[section] = []
    if (!Array.isArray(mod[section])) {
      config[section].push(...mod[section])
      return
    }
    config[section].push(...mod[section])
  })
  return config
}
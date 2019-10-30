import { HygenResolver } from '../../types'
import {fetchEnv} from './env'
import {fetchTools} from './tools'
import { fetchGenerators } from './generators'

export const configResolver: HygenResolver = (config) => {
  config.env = config.env || fetchEnv()
  config.tools = config.tools || fetchTools()

  // build tools config
  // find template files, config files
  return Promise.all([
    fetchGenerators(config),
    fetchConfig(config),
  ])
}
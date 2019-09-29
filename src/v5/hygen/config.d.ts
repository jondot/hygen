import { HelpersConfig } from './context'
import { Logger } from './logger'
import { YargsConfig } from './yargs'

export interface EnvConfig {
  cwd: string
}
export interface HygenConfig {
  helpers: HelpersConfig
  logger: Logger
  yargs: YargsConfig
}

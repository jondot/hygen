import { HelpersConfig } from './context'
import { Logger } from './logger'
import { YargsConfig } from './yargs'
import { HygenResolver } from './resolvers'
import { HooksConfig } from './hooks'

export interface EnvConfig {
  cwd: string
}
export interface HygenConfig {
  helpers?: HelpersConfig
  logger?: Logger
  hooks?: HooksConfig
  yargs?: YargsConfig
}

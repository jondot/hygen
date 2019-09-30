import { HelpersConfig } from './context'
import { Logger } from './logger'
import { YargsConfig } from './yargs'
import { HygenResolver, ResolverFn } from './resolvers'

export interface EnvConfig {
  cwd: string
}
export interface HygenConfig {
  helpers: HelpersConfig
  logger: Logger
  hooks: Hooks
  yargs: YargsConfig
}
export interface Hooks {
  [s: string]: Array<ResolverFn>
}

import { HelpersConfig } from './context'
import { Logger } from './logger'
import { YargsConfig } from './yargs'
import { HygenResolver } from './resolvers'
import { HooksConfig } from './hooks'
import { ProcessEnv, StringMap } from './types'
import { Io } from './utils'
import Enquirer from 'enquirer'

export interface ConfigFileConfig {
  filenames: Array<string>
  hygenIgnore: Array<string>
}

export type ModulesConfig = Array<string | HygenResolver>
export type ExecFn = (action: string, body: string) => string
export interface BinConfig {
  env: EnvConfig
  tools: ToolsConfig
}
export interface ToolsConfig {
  io: Io
  exec: ExecFn
  createPrompter: () => Enquirer
}
export interface EnvConfig {
  cwd: string
  argv: Array<string>
  templateDirs: Array<string>
  configFiles: Array<string>
  vars: ProcessEnv
  debug?: boolean
}
export interface GeneratorConfig {
  generator: string | null
  action: string | null
  path: string | null
  templates: Array<string>
  ignored: Array<string>
  configFiles: Array<string>
}
export interface HygenConfig {
  env: EnvConfig
  config: ConfigFileConfig
  directives: Array<string>
  generator: GeneratorConfig
  helpers: HelpersConfig
  hooks: HooksConfig
  logger: Logger
  modules: ModulesConfig
  params: object
  tools: ToolsConfig
  yargs?: YargsConfig
}

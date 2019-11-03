import { Logger } from '../src/types'
import Enquirer from 'enquirer'

export type ShellFn = (action: string, body: string) => string
export type prompterFn = () => Enquirer

export interface Pathlike {
  sep: string
  resolve: (...segments: Array<string>) => string
  join: (...paths: Array<string>) => string
  dirname: (p: string) => string
}

export interface IoConfig {
  exec: ShellFn
  load: (string) => Promise<unknown>
  none: (any) => Promise<{}>,
  exists: (string: any) => boolean,
  path: Pathlike
  consoleWrite: (...msg: Array<unknown>) => void
}

export type GeneratorConfig = GeneratorSummaryConfig | GeneratorDataConfig

export interface GeneratorDataConfig {
  action: string
  generator: string
  name: string
  params: Array<string>
  prompts: Array<string>
  subaction: string | null
  summary: GeneratorSummaryConfig
  templates: Array<string>
}



export interface GeneratorSummaryConfig {
  summary?: SummaryObject
}

export interface RenderConfig {
  inject: HygenRenderer
  message: HygenRenderer
  shell: HygenRenderer
  to: HygenRenderer

  [s: string]: HygenRenderer
}

export type HygenRenderer = () => any

export interface ToolsConfig {
  logger: Logger,
  prompter: prompterFn
  render: RenderConfig
  reversePathsToWalk: ReversePathWalkFn
  [s: string]: any
}

export interface EnvValuesConfig {
  argv: Array<string>
  configFile: Array<string>
  cwd: string
  debug: boolean
  ignoreFile: Array<string>
  paramsFile: Array<string>
  platform: string
  promptFile: Array<string>
  templates: Array<string>
  templateFiles: Array<string>
  yargsModuleFile: Array<string>
}

export interface EnvFunctionsConfig {
  exec: ShellFn
  logger: Logger
  prompter: prompterFn
  io: IoConfig
}

export type EnvConfig = EnvValuesConfig & EnvFunctionsConfig

export interface HygenBuildConfig {
  env?: EnvConfig
  io?: IoConfig
  tools?: {[s: string]: unknown}
  helpers?: HelpersConfig
  modules?: Array<UserConfig>
  params?: any
  generator?: GeneratorConfig
}

export interface HygenBuildConfig {
  env?: EnvConfig
  io?: IoConfig
  tools?: ToolsConfig
  helpers?: HelpersConfig
  modules?: Array<UserConfig>
  params?: any
  generator?: GeneratorConfig
}

export interface UserConfig {
  helpers?: HelpersConfig
  params?: HygenResolver
  prompt?: HygenResolver
}

export interface HelpersConfig {
  [s: string]: unknown
}

export type HygenResolver = (config: HygenBuildConfig) => Promise<HygenBuildConfig>

export interface SummaryObject {
  [s: string]: {
    [s: string]: Array<string>
  }
}
export interface ReversePathWalkFnArgs {
  folders: Array<string>
  path: Pathlike
  from?: string
  to?: string
}
export type ReversePathWalkFn =  (ReversePathWalkFnArgs) => Array<string>

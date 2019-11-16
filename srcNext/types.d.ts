import { Logger } from '../src/types'
import * as Enquirer from 'enquirer'
import * as yargs from 'yargs'
import { Chalk, ColorSupport } from 'chalk/types/index.d'

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
  exists: (string) => Promise<boolean>,
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
  reversePathsToWalk: ReversePathWalkFn

  [s: string]: any
}

export interface EnvConfig {
  argv: Array<string>
  configFile: Array<string>
  cwd: string
  debug: boolean
  ignoreFile: Array<string>
  paramsFile: Array<string>
  platform: string
  promptFile: Array<string>
  templates: Array<string>
  notTemplateFiles: Array<string>
  yargsModuleFile: string
  yargsModuleExt: string
}

export interface HygenBuildConfig {
  env?: EnvConfig
  io?: IoConfig
  tools?: ToolsConfig
  helpers?: HelpersConfig
  init?: Array<HygenResolver>
  inits?: Array<HygenResolver>
  prompt?: Array<HygenResolver>
  prompts?: Array<HygenResolver>
  param?: Array<HygenResolver>
  params?: Array<HygenResolver>
  args?: Args
  generator?: GeneratorConfig
  yargs?: Array<HygenResolver>
}

export interface Args {
  generator?: string
  action?: string
  subaction?: string

  [s: string]: unknown
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
    [s: string]: {
      modules: Array<string>
      templates: Array<string>
    }
  }
}

export interface ReversePathWalkFnArgs {
  folders: Array<string>
  path: Pathlike
  from?: string
  to?: string
}

export type ReversePathWalkFn = (ReversePathWalkFnArgs) => Array<string>

export interface Params {
  [s: string]: unknown
}

export type ShowOutput = (msg: string, ...other: Array<any>) => void

export interface LogLevel {
  name: string
  level: number
  msgFormat: chalk | ((string) => string)
  otherFormat?: ([any]) => any
}

export interface AllLogLevels {
  [s: string]: LogLevel
}

export type ChalkFn = Chalk & { supportsColor: ColorSupport }

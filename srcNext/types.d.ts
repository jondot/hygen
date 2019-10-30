import { Logger } from '../src/types'
import Enquirer from 'enquirer'

export type ShellFn = (action: string, body: string) => string
export type prompterFn = () => Enquirer
export interface IoConfig {
  exec: ShellFn
  load: (string) => Promise<unknown>
  none: (any) => {}
  exists: (string: any) => boolean
}

export interface GeneratorConfig {
  generator: string
  action: string
  subaction: string | null
  name: string
  templates: Array<string>
  prompts: Array<string>
  params: Array<string>
  all: Array<string>
}

export interface RenderConfig {
  to: HygenRenderer
  inject: HygenRenderer
  shell: HygenRenderer
  message: HygenRenderer
  [s: string]: HygenRenderer
}
export type HygenRenderer = () => any

export interface ToolsConfig {
  prompter: prompterFn
  render: RenderConfig
  [s: string]: any
}

export interface EnvValuesConfig {
  argv: Array<string>
  configFile: Array<string>
  cwd: string
  debug: boolean
  ignoreFile: Array<string>
  paramsFile: Array<string>
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


export interface HygenConfig  {
  env?: EnvConfig
  tools?: object
  helpers?: object
  generators?: object
  params?: any
}
export type HygenResolver = (config: HygenConfig) => Promise<HygenConfig>

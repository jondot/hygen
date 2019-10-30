import { Logger } from '../src/types'
import Enquirer from 'enquirer'

export type ShellFn = (action: string, body: string) => string

export interface IoConfig {
  exec: ShellFn
  load: (string) => Promise<unknown>
  none: (any) => {}
  exists: (string: any) => boolean
}

export interface EnvConfig {
  argv: Array<string>
  configFile: Array<string>
  cwd: string
  debug: boolean
  exec: ShellFn
  ignoreFile: Array<string>
  logger: Logger
  paramsFile: Array<string>
  promptFile: Array<string>
  prompter: () => Enquirer
  templates: Array<string>
  yargsModuleFile: Array<string>
  io: IoConfig
}
export interface HygenConfig  {
  env: EnvConfig
  tools?: object
  helpers?: object
  generators?: object
  params?: any
}
export type HygenResolver = (config: HygenConfig) => Promise<HygenConfig>

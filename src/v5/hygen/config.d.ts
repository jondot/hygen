import { GeneratorConfig } from './generators'
import { Logger } from './logger'
import {YargsConfig} from './yargs'

interface loadedFileConfig {
  files: string[],
  data: object,
}
interface searchFileConfig {
  files?: string[],
  filenames?: string[],
  searchStart: string,
  searchEnd?: string,
  searchLimit?: number,
}
interface ignoreConfig {
  dirs: string[],
  files: string[],
  actions: string[],
  generators: string[],
  templates: string[],
}
export interface configFiles {
  templatePaths: string[],
  globalConfig: searchFileConfig,
  hygenIgnore: searchFileConfig,
  localConfig: searchFileConfig,
  ignore: ignoreConfig,
}
export interface EnvConfig {
  argv?: string[]
  cwd?: string
  templatesDir?: string
  configFile?: string
}

export type ModulesConfig = Array<string | HygenConfig>

export interface DirectiveConfig {}

export interface HelpersConfig {
  [s: string]: any
}

export interface HooksConfig {
  [s: string]: ResolverFn[]
}

export interface OptionsConfig {
  [s: string]: any
}
export interface ParamsConfig {
  dry?: boolean,
  [s: string]: none,
}

export interface ToolsConfig {
  [s: string]: (...args: any) => any
}

export interface HygenConfig {
  configFile?: ConfigFileConfig
  env?: EnvConfig
  generator?: GeneratorConfig
  modules?: ModulesConfig
  directives?: DirectiveConfig
  helpers?: HelpersConfig
  hooks?: HooksConfig
  logger?: Logger
  options?: OptionsConfig
  params?: ParamsConfig
  tools?: ToolsConfig
  yargs?: YargsConfig
}

export declare type ResolverFn = (config: HygenConfig) => Promise<HygenConfig>

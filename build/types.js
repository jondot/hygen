"use strict";
// // @flow
// export type Logger = {
//   ok: (msg: string) => void,
//   notice: (msg: string) => void,
//   warn: (msg: string) => void,
//   err: (msg: string) => void,
//   log: (msg: string) => void,
//   colorful: (msg: string) => void,
// }
//
// export type Prompter = {
//   prompt: any => Promise<any>,
// }
//
// export type RenderedAction = {
//   file: string,
//   attributes: Object,
//   body: string,
// }
//
// export type EnvironmentConfig = {
//   cwd: string,
//   argv: Array<string>,
//   templatesDir: string,
//   configFile: string,
// }
//
// export type IgnoredConfig = {
//   generators: Array<string>,
//   actions: Array<string>,
//   files: Array<string>,
//   patterns: Array<RegExp>,
// }
//
// export type UnstructuredConfig = { [string]: any }
//
// export type HookConfig = { [string]: Array<Hook> }
//
// export type GeneratorConfig = {
//   name: string,
//   action: string,
//   subaction: string,
//   templates: Array<string>,
// }
//
// export type RunnerConfig = {
//   exec: (sh: string, body: string) => void,
//   templates: string,
//   cwd: string,
//   logger: Logger,
//   debug: boolean,
//   helpers: Object,
//   createPrompter: () => Prompter,
// }
//
// export type HygenConfig = {
//   config: RunnerConfig,
//   env: EnvironmentConfig,
//   generator: GeneratorConfig,
//   helpers: UnstructuredConfig,
//   hooks: HookConfig,
//   ignored: IgnoredConfig,
//   tools: UnstructuredConfig,
// }
//
// export type Hook = () => Promise<HygenConfig>
//
// export type ChainedVars = Promise<HygenConfig>
//
// export type Resolver = {
//   name: string,
//   resolve: () => HygenConfig,
//   hooks: Array<string>,
// }
//
// export type ResolverIO = {
//   exists: string => Promise<boolean>,
//   load: string => Promise<Object>,
//   none: string => Object,
// }
//
// export type ActionResult = any
//
// export type RunnerResult = {
//   success: boolean,
//   time: number,
//   actions: Array<ActionResult>,
//   failure?: {
//     message: string,
//     availableActions: Array<string>,
//   },
// }

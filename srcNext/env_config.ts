import { EnvConfig } from './types'

export const extractEnvVars = (): Partial<EnvConfig> => ({
  templates: arrayFromEnv(process.env.HYGEN_TMPLS) || ['_templates'],
  configFile: arrayFromEnv(process.env.HYGEN_CONFIG) || ['.hygen.js'],
  ignoreFile: arrayFromEnv(process.env.HYGEN_IGNORE) || ['.hygenignore'],
  paramsFile: arrayFromEnv(process.env.HYGEN_PARAMS) || ['index.js'],
  promptFile: arrayFromEnv(process.env.HYGEN_PARAMS) || ['index.js'],
  yargsModuleFile: arrayFromEnv(process.env.HYGEN_YARGS_MODULE) || ['yargs.module.js'],
  debug: !!process.env.HYGEN_DEBUG || !!process.env.DEBUG,
})

function arrayFromEnv(value: string | Array<string>, separator: string = ':'): Array<string> | false {
  if (!value) return false
  return (Array.isArray(value)) ? value : value.split(separator)
}


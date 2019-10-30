import { EnvConfig } from '../../types'
import Logger from '../../../src/logger'
import fs from 'fs-extra'
import {createPrompter} from './tools'
function arrayFromEnv(value: string | Array<string>, separator: string = ':'): Array<string> | false {
  if (!value) return false
  return (Array.isArray(value)) ? value : value.split(separator)
}

const shellFunction = (action, body) => {
  const opts = body && body.length > 0 ? { input: body } : {}
  return require('execa').shell(action, opts)
}
const asyncRequire = (pkg: string): Promise<unknown> => Promise.resolve(require(pkg))


export const fetchEnv = (): EnvConfig => ({
  argv: process.argv.slice(2),
  cwd: process.cwd(),
  templates: arrayFromEnv(process.env.HYGEN_TMPLS) || ['_templates'],
  configFile: arrayFromEnv(process.env.HYGEN_CONFIG) || ['.hygen.js'],
  ignoreFile: arrayFromEnv(process.env.HYGEN_IGNORE) || ['.hygenignore'],
  paramsFile: arrayFromEnv(process.env.HYGEN_PARAMS) || ['index.js'],
  promptFile: arrayFromEnv(process.env.HYGEN_PARAMS) || ['index.js'],
  yargsModuleFile: arrayFromEnv(process.env.HYGEN_YARGS_MODULE) || ['yargs.module.js'],
  debug: !!process.env.HYGEN_DEBUG || !!process.env.DEBUG,
  templateFiles: [],
  logger: new Logger((...msg) => console.log(...msg)),
  exec: shellFunction, /* deprecated, duplicated to io */
  prompter: createPrompter,
  io: {
    exec: shellFunction,
    exists: fs.exists,
    load: asyncRequire,
    none: () => Promise.resolve({}),
  },
})


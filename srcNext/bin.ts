// import {runner} from './index'
import { EnvConfig, HygenConfig } from './types'
import Logger from '../src/logger'
import { runner } from './index'
import { extractEnvVars } from './env_config'
import fs from 'fs-extra'

const shellFunction = (action, body) => {
  const opts = body && body.length > 0 ? { input: body } : {}
  return require('execa').shell(action, opts)
}
const asyncRequire = (pkg: string): Promise<unknown> => Promise.resolve(require(pkg))
const createPrompter = () => require('enquirer')

const initialConfig: HygenConfig = {
  env: {
    ...extractEnvVars(),
    argv: process.argv.slice(2),
    cwd: process.cwd(),
    logger: new Logger((...msg) => console.log(...msg)),
    exec: shellFunction, /* deprecated, duplicated to io */
    prompter: createPrompter,

    io: {
      exec: shellFunction,
      exists: fs.exists,
      load: asyncRequire,
      none: () => Promise.resolve({}),
    },
  } as EnvConfig,
}

runner(initialConfig).then(final => console.debug('final config', final))

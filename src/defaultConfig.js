import { mergeVars } from './hygenVars'
import type { HygenConfig } from './types'
import { mkLogger } from './logger'
import path from 'path'
import fs from 'fs-extra'

const mkConfig = (existingConfig: HygenConfig = {}): HygenConfig =>
  ({
    configFile: {globalPaths: [], localPaths: []},
    env: {},
    modules: ['logging','help'],
    localConfigFilenames: ['index.js', 'prompt.js',],
    directives: ['inject','message','sh', 'write',],
    generator: {templates: [],ignored: [], paramFiles: []},
    helpers: {},
    hooks: {},
    ignored: { generators: [], actions: [], files: [], patterns: [] },
    logger: mkLogger(),
    options: {},
    params: {},
    templates: {},
    tools: {
      exec: (action, body) => {
        const opts = body && body.length > 0 ? { input: body } : {}
        return require('execa').shell(action, opts)
      },
      createPrompter: () => require('enquirer'),
      path,
      io: {
        exists: fs.pathExists,
        load: file => new Promise.resolve(require(file)),
      },
      fs,
      ...existingConfig.tools
    },
    ...existingConfig,
  })

const mkConfigPromise = (existingConfig: HygenConfig = {}): Promise<HygenConfig> =>
  Promise.resolve(mkConfig(existingConfig))

module.exports = { mkConfig, mkConfigPromise }

#!/usr/bin/env node

import { ProcessEnv, strKVEntries, strKVPair } from './hygen'

const fs = require('fs-extra').promises
const { hygen } = require('./index')
const { path } = require('path')

const reduceEntriesArr = (vars: ProcessEnv, [k, v]: strKVPair): ProcessEnv => {
  vars[k] = v
  return vars
}
const emptyVars: ProcessEnv = {}
const envV: strKVEntries = Object.entries(process.env)
const extractEnvVars = (prefix: string): ProcessEnv =>
  envV
    .filter(([k, _v]) => k.startsWith(prefix))
    .reduce(reduceEntriesArr, emptyVars)

const run = async () =>
  await hygen({
    env: {
      argv: process.argv.slice(2),
      cwd: process.cwd(),
      templatesDir: process.env.HYGEN_TMPLS || "_templates",
      configFile: process.env.HYGEN_CONFIG || ".hygen.js",
      vars: extractEnvVars('HYGEN')
    },
    tools: {
      io: {
        exists: fs.exists,
        load: (f: string): any => Promise.resolve(require(f)),
        none: (_f: string): any => Promise.resolve({}),
        path
      }
    }
  })()

  (async () => await run())();
//

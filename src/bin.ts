#!/usr/bin/env node
import { ProcessEnv, strKVEntries, strKVPair } from './hygen'
import { mkConfig } from './defaultConfig'
import { exec } from './utils/exec'
import { hygen } from './index'
import path from 'path'

const fs = require('fs-extra').promises
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
// TODO find right way to resolve promise here
const run = async () =>
  await hygen(
    mkConfig({
      env: {
        argv: process.argv.slice(2),
        cwd: process.cwd(),
        templateDirs: [process.env.HYGEN_TMPLS || '_templates'],
        configFiles: [process.env.HYGEN_CONFIG || '.hygen.js'],
        vars: extractEnvVars('HYGEN'),
      },
      tools: {
        io: {
          exists: fs.exists,
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          load: (f: string): any => Promise.resolve(require(f)),
          none: (_f: string): any => Promise.resolve({}),
          path,
        },
        exec,
        createPrompter: () => require('enquirer'),
      },
    }),
  )
run()

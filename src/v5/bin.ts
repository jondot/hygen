#!/usr/bin/env node

const fs = require('fs-extra').promises
const { hygen } = require('./index')
const { path } = require('path')

const run = async () =>
  await hygen({
    env: {
      argv: process.argv.slice(2),
      cwd: process.cwd(),
      templatesDir: process.env.HYGEN_TMPLS || '_templates',
      configFile: process.env.HYGEN_CONFIG || '.hygen.js',
    },
    tools: {
      io: {
        exists: fs.exists,
        // $FlowFixMe
        load: f => Promise.resolve(require(f)),
        none: f => Promise.resolve({}),
        path,
      },
    },
  })()

(async () => await run())()


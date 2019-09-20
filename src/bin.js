#!/usr/bin/env node

const { hygen } = require('./index')
const {mkLogger} = require('./logger')

await hygen({
  env: {
    argv: process.argv.slice(2),
    cwd: process.cwd(),
    templatesDir: process.env.HYGEN_TMPLS || '_templates',
    configFile: process.env.HYGEN_CONFIG || '.hygen.js'
  },
  /* TODO should this be here? */
  logger: mkLogger(),
})

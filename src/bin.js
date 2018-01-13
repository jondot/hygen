#!/usr/bin/env node

const path = require('path')
const { runner } = require('./index')
const defaultTemplates = path.join(__dirname, '../src/templates')

runner(process.argv.slice(2), {
  templates: defaultTemplates,
  cwd: process.cwd(),
  logger: console,
  debug: !!process.env.DEBUG
})

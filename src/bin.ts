#!/usr/bin/env node

import path from 'path'
import Logger from './logger'
import { runner } from './index'

const defaultTemplates = path.join(__dirname, '../src/templates')
runner(process.argv.slice(2), {
  templates: defaultTemplates,
  cwd: process.cwd(),
  logger: new Logger(console.log.bind(console)),
  debug: !!process.env.DEBUG,
  exec: (action, body) => {
    const opts = body && body.length > 0 ? { input: body } : {}
    return require('execa').shell(action, opts)
  },
  createPrompter: () => require('enquirer'),
})

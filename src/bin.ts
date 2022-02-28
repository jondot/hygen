#!/usr/bin/env node

import path from 'path'
import Logger from './logger'
import { runner } from './index'

const defaultTemplates = path.join(__dirname, '../src/templates')
runner(process.argv.slice(2), {
  templates: defaultTemplates,
  cwd: process.cwd(),
  logger: new Logger(console.log.bind(console)), // eslint-disable-line no-console
  debug: !!process.env.DEBUG,
  exec: (action, body) => {
    const opts = body && body.length > 0 ? { input: body } : {}
    return require('execa').command(action, { ...opts, shell: true }) // eslint-disable-line @typescript-eslint/no-var-requires
  },
  createPrompter: () => require('enquirer'),
}).then(({ success }) => process.exit(success ? 0 : 1))

#!/usr/bin/env node
const path = require('path');

const _require = require('./index'),
      runner = _require.runner;

const defaultTemplates = path.join(__dirname, '../src/templates');

const Logger = require('./logger');

runner(process.argv.slice(2), {
  templates: defaultTemplates,
  cwd: process.cwd(),
  logger: new Logger(console.log.bind(console)),
  debug: !!process.env.DEBUG,
  exec: (action, body) => {
    const opts = body && body.length > 0 ? {
      input: body
    } : {};
    return require('execa').shell(action, opts);
  }
});
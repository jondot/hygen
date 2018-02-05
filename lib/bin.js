#!/usr/bin/env node
const path = require('path');

const _require = require('./index'),
      runner = _require.runner;

const defaultTemplates = path.join(__dirname, '../src/templates');
runner(process.argv.slice(2), {
  templates: defaultTemplates,
  cwd: process.cwd(),
  logger: console,
  debug: !!process.env.DEBUG
});
#!/usr/bin/env node
"use strict";

const _require = require('./index'),
      runner = _require.runner;

const Logger = require('./logger');

const path = require('path');

const defaultTemplates = path.join(__dirname, '../src/templates');
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
  },
  createPrompter: () => require('enquirer')
});
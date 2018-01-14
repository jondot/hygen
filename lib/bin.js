#!/usr/bin/env node
'use strict';

var path = require('path');

var _require = require('./index'),
    runner = _require.runner;

var defaultTemplates = path.join(__dirname, '../src/templates');

runner(process.argv.slice(2), {
  templates: defaultTemplates,
  cwd: process.cwd(),
  logger: console,
  debug: !!process.env.DEBUG
});
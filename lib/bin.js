#!/usr/bin/env node
const _require = require('./index'),
      runner = _require.runner;

const Logger = require('./logger');

runner(process.argv.slice(2), {
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
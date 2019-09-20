const chalk = require('chalk')
const { yellow, red, green, magenta, cyan, white, gray } = chalk
const template = require('chalk/templates')

const CHALK_MAPPING = {
  trace: gray,
  debug: cyan,
  err: red,
  error: red,
  info: magenta,
  ok: green,
  silent: () => null,
  verbose: white,
  warn: yellow,
}

const LOG_LEVELS = ['trace', 'debug', 'info', 'warn', 'error', 'silent']
const LEVEL_EQUIVALENTS = {
  err: 4,
  ok: 2,
}

const mkLogger = env => new Logger(console.log.bind(console), env)

class Logger {
  constructor(log, env, mappings = CHALK_MAPPING) {
    this.yargs = env.yargs || {}
    this.log = log
    this.mappings = mappings
    this.logLevels = LOG_LEVELS
    this.setLevelFrom(this.yargs)

    Object.entries(this.mappings).forEach(([logType, formatter]) => {
      const typeLevel = this.levelFor(logType)

      this[logType] = function(...msg) {
        if (typeLevel >= this.logLevel) return log(formatter(...msg))
        return null
      }
    })
  }

  levelFor = level => {
    if (LOG_LEVELS.indexOf(level) >= 0) return LOG_LEVELS.indexOf(level)
    return LEVEL_EQUIVALENTS[level] || 2
  }

  logLevelFrom = params => {
    if (params.logLevel) return params.logLevel
    if (params.s || params.silent) return 5
    if (params.q || params.quiet) return 4
    if (params.warn) return 3
    if (params.debug || process.env.DEBUG) return 1
    if (params.trace) return 0
    return 2
  }

  setLevelFrom(yargs) {
    this.logLevel = this.logLevelFrom(yargs)
  }

  colorful(msg) {
    this.log(template(chalk, msg))
  }
}

module.exports = { Logger, mkLogger }

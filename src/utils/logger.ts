import {
  StringMap,
  NumberMap,
  ChalkMapping,
  LogMessage,
  YargsConfig,
} from '../hygen'
import { LogYargs } from '../hygen/logger'

import chalk from 'chalk'

import * as templates from 'chalk/templates'
import yargs from 'yargs'

const { yellow, red, green, magenta, cyan, white, gray } = chalk
export const CHALK_MAPPING: ChalkMapping = {
  trace: gray,
  debug: cyan,
  info: magenta,
  warn: yellow,
  error: red,

  log: white,
  ok: green,
  notice: cyan,
  verbose: white,
}

export const LOG_LEVELS: string[] = [
  'trace',
  'debug',
  'info',
  'log',
  'warn',
  'error',
  'silent',
]
const LEVEL_EQUIVALENTS: NumberMap = {
  err: 4,
  ok: 2,
  notice: 2,
}

export const mkLogger = env => new Logger(console.log.bind(console), env)

// silent no output at all
// quiet only short error messages
// warn only short warning messages
// info standard messages
// verbose standard messages with more details
// debug dumps at keys spots
// trace ignore

// log

export class Logger {
  yargs: LogYargs
  log: LogMessage
  mappings: object
  logLevels: string[]
  logLevel = 2

  constructor(
    log: LogMessage,
    yargs: LogYargs = {},
    mappings: ChalkMapping = CHALK_MAPPING,
  ) {
    this.yargs = yargs
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

  levelFor = (level: string): number => {
    if (LOG_LEVELS.indexOf(level) >= 0) return LOG_LEVELS.indexOf(level)
    return LEVEL_EQUIVALENTS[level] || 2
  }

  logLevelFrom = (params: yargs) => {
    if (params.logLevel) return params.logLevel
    if (params.s || params.silent) return 5
    if (params.q || params.quiet) return 4
    if (params.warn) return 3
    if (params.debug || process.env.DEBUG) return 1
    if (params.trace) return 0
    return 2
  }

  setLevelFrom(yargs: YargsConfig): void {
    this.logLevel = this.logLevelFrom(yargs)
  }

  colorful(msg: string): void {
    this.log(template(chalk, msg))
  }
}

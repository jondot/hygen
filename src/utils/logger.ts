import {
  StringMap,
  NumberMap,
  ChalkMapping,
  LogMessage,
  YargsConfig, YargsResult, EnvConfig,
} from '../hygen'
import { LogYargs } from '../hygen'
import yargs from 'yargs'
import chalk from 'chalk'

const loggerYargsOptions  = {
  logLevel: {
    default: 2,
    describe: 'log level between 1(trace) and 5(silent)',
    type: 'number',
  },
  trace: {
    alias: 'vvv',
    describe: '[logLevel: 0] show absolutely every thing going on (long!)',
    type: 'boolean',
  },
  debug: {
    alias: 'vv',
    describe: '[logLevel: 1] show summaries of data',
    type: 'boolean',
  },
  verbose: {
    alias: ['v'],
    type: 'boolean',
    describe: '[logLevel: 2] Extra information, default setting',
  },
  quiet: {
    alias: ['q'],
    describe: '[logLevel: 3] Show only warnings and errors',
    type: 'boolean',
  },
  error: {
    alias: ['err'],
    describe: '[logLevel: 4] Show only errors',
    type: 'boolean',
  },
  silent: {
    alias: 's',
    describe: '[logLevel: 5] no output',
    type: 'boolean',
  },
}

// import * as templates from 'chalk/templates'

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
  'verbose',
  'quiet',
  'error',
  'silent',
]

const LEVEL_EQUIVALENTS: NumberMap = {
  ok: 2,
  notice: 2,
}

export const mkLogger = (env: EnvConfig): Logger  => {
  const loggerYargs = yargs
    .env('HYGEN')
    .options(loggerYargsOptions)
  console.log(loggerYargs)
  return new Logger(console.log.bind(console), env)
}

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
    this.setLevelFrom(yargs)

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

  logLevelFrom = (params: LogYargs) => {
    if (params.logLevel) return params.logLevel
    if (params.silent) return 5
    if (params.quiet) return 4
    if (params.warn) return 3
    if (params.debug || process.env.DEBUG) return 1
    if (params.trace) return 0
    return 2
  }

  setLevelFrom(yargs: LogYargs): void {
    this.logLevel = this.logLevelFrom(yargs)
  }

  colorful(msg: string): void {
    // this.log(template(chalk, msg))
  }
}

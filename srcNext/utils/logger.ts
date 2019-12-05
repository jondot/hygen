import { AllLogLevels, ChalkObjType, LogLevel, LoggerHandler } from 'srcNext/types'
import * as chalk from 'chalk'

// mkLogger(handler)

export const mkLogger = (handler, options = {}) => {
  const frame = new LoggerFramework(handler)
  const logger = new Proxy(frame, LoggerProxy)

  logger.defaultLogLevel = { name: 'Default', msgFormat: chalk.white.dim, msgLevel: 2 }

  logger.trace = { name: 'Trace', msgFormat: chalk.gray, msgLevel: 0 }
  logger.debug = { name: 'Debug', msgFormat: chalk.white, msgLevel: 1 }
  logger.info = { name: 'Info', msgFormat: chalk.cyan, msgLevel: 2 }
  logger.ok = { name: 'Ok', msgFormat: chalk.green, msgLevel: 2 }
  logger.notice = { name: 'Notice', msgFormat: chalk.magenta.bold, msgLevel: 2 }
  logger.warn = { name: 'Warn', msgFormat: chalk.yellow, msgLevel: 3 }
  logger.error = { name: 'Error', msgFormat: chalk.red.bold, msgLevel: 4 }

  return logger
}

export class LoggerFramework {
  _reserved_keys: Array<string> = [
    'format', 'defaultLogLevel', 'logLevel',
    'logLevels', 'handler', '_reserved_keys', '_proxy',
  ]
  format: boolean = true

  defaultLogLevel: LogLevel = {
    dataFormat: data => data,
    dataLevel: 0,
    msgFormat: msg => msg,
    msgLevel: 1,
    name: 'Default',
  }
  logLevel: number = this.defaultLogLevel.msgLevel
  logLevels: AllLogLevels = { default: this.defaultLogLevel }

  handler: LoggerHandler

  constructor(handler: LoggerHandler, format: boolean = true, logLevel: number = 3) {
    this.handler = handler
    this.logLevel = logLevel
    this.format = !format
  }
}

const trace: LoggerHandler = (msg, ...other) => {
  const myLevel = this.logLevels.trace
  if (this.logLevel < myLevel.level) return
  this.handler(
    (myLevel.msgFormat || ((s) => s))(msg),
    ...other,
  )
}

export class Logger {
  chalk: Partial<ChalkObjType> = ChalkObj // @ts-ignore
  defaultLogLevel: LogLevel = { name: 'Default', msgFormat: this.chalk.white.dim, msgLevel: 2 }
  logLevels: AllLogLevels = {
    trace: { name: 'Trace', msgFormat: this.chalk.gray, msgLevel: 0 },
    debug: { name: 'Debug', msgFormat: this.chalk.white, msgLevel: 1 },
    info: { name: 'Info', msgFormat: this.chalk.cyan, msgLevel: 2 },
    ok: { name: 'Ok', msgFormat: this.chalk.green, msgLevel: 2 },
    notice: { name: 'Notice', msgFormat: this.chalk.magenta.bold, msgLevel: 2 },
    warn: { name: 'Warn', msgFormat: this.chalk.yellow, msgLevel: 3 },
    error: { name: 'Error', msgFormat: this.chalk.red.bold, msgLevel: 4 },
    default: this.defaultLogLevel,
  }
}

const addLogLevel = (target, prop, value) => {
  // TODO decide if this should throw an error
  if (target._reserved_keys.includes(prop)) return target[prop]
  if (typeof value === 'function') {
    target[prop] = value
  } else {
    target[prop] = {
      ...target.defaultLogLevel,
      ...value,
    }
  }
}

const logProxy = (target, prop) => {
  if (target.hasOwnProperty(prop)) return target[prop]

  return (msg, ...data) => {
    const log = target.logLevels[prop] || target.logLevels.default

    target.handler(log.msgFormat(msg))
    if (data) data.forEach(d => target.handler(d))

  }
}

const LoggerProxy = {
  get: logProxy,
  set: addLogLevel,
}



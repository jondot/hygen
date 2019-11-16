import { AllLogLevels, ShowOutput, ChalkFn } from 'srcNext/types'
import * as ChalkObj from 'chalk'

export class Logger {
  static chalk: ChalkFn = ChalkObj

  static LOG_LEVELS: AllLogLevels = {
    trace: { name: 'Trace', msgFormat: Logger.chalk.gray, level: 4 },
    debug: { name: 'Debug', msgFormat: Logger.chalk.white, level: 3 },
    info: { name: 'Info', msgFormat: Logger.chalk.cyan, level: 2 },
    ok: { name: 'Ok', msgFormat: Logger.chalk.green, level: 2 },
    notice: { name: 'Notice', msgFormat: Logger.chalk.magenta.bold, level: 2 },
    warn: { name: 'Warn', msgFormat: Logger.chalk.yellow, level: 1 },
    error: { name: 'Error', msgFormat: Logger.chalk.red.bold, level: 0 },
  }

  showOutput: ShowOutput
  logLevel: number
  formatting: boolean

  constructor(showOutput: ShowOutput, formatting: true, logLevel: number = 3) {
    this.showOutput = showOutput
    this.logLevel = logLevel
    this.formatting = formatting
  }

  trace: ShowOutput = (msg, ...other) => {
    const myLevel = Logger.LOG_LEVELS.trace
    if (this.logLevel < myLevel.level) return
    this.showOutput(
      (myLevel.msgFormat || ((s) => s))(msg),
      other,
    )
  }
}



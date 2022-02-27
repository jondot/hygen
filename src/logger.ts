import chalk from 'chalk'

// chalk 4.1.2 doesn't type template property
const { yellow, red, green, magenta, template }: any = chalk

class Logger {
  log: (message?: any, ...optionalParams: any[]) => void

  constructor(log) {
    this.log = log
  }

  colorful(msg) {
    this.log(template(chalk, msg))
  }

  notice(msg) {
    this.log(magenta(msg))
  }

  warn(msg) {
    this.log(yellow(msg))
  }

  err(msg) {
    this.log(red(msg))
  }

  ok(msg) {
    this.log(green(msg))
  }
}
export default Logger

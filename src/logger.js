const { yellow, red, green, magenta } = require('chalk')
class Logger {
  constructor(log) {
    this.log = log
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
module.exports = Logger

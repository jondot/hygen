const chalk = require('chalk')
const { yellow, red, green, magenta } = chalk
const template = require('chalk/templates')
class Logger {
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
module.exports = Logger

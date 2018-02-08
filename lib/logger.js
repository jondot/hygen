const _require = require('chalk'),
      yellow = _require.yellow,
      red = _require.red,
      green = _require.green,
      magenta = _require.magenta;

class Logger {
  constructor(log) {
    this.log = log;
  }

  notice(msg) {
    this.log(magenta(msg));
  }

  warn(msg) {
    this.log(yellow(msg));
  }

  err(msg) {
    this.log(red(msg));
  }

  ok(msg) {
    this.log(green(msg));
  }

}

module.exports = Logger;
^!const path = require('path')

class pathTo {
  constructor(...base) {
    this.base = base
  }
  get currentPath() {
    return path.join(...this.base)
  }
  add(...paths) {
    return new pathTo(...this.base, ...paths)
  }
  path(...parts) {
    return path.join(...this.base, ...parts)
  }
}

module.exports = {
  pathTo,
}

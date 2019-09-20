const importedPath = require('path')

class pathTo {
  constructor(...base) {
    this.pathUtil = importedPath
    this.base = base
  }
  get currentPath() {
    return this.pathUtil.join(...this.base)
  }
  set pathUtil(val) {
    return this.pathUtil = val
  }
  add(...paths) {
    return new pathTo(...this.base, ...paths)
  }
  path(...parts) {
    return this.pathUtil.join(...this.base, ...parts)
  }
}

module.exports = {
  pathTo,
}

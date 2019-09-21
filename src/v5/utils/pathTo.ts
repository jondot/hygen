import { Pathlike, pathToUtil } from '../hygen'

const importedPath = require('path')

class pathTo {
  pathUtil: Pathlike
  base: string[]

  constructor(...base: string[]) {
    this.path = importedPath
    this.base = base
  }

  get currentPath(): string {
    return this.pathUtil.join(...this.base)
  }

  add(...paths: string[]): pathToUtil {
    return new pathTo(...this.base, ...paths)
  }
  path(...paths: string[]): string {
    return this.pathUtil.join(...this.base, ...paths)
  }
}

module.exports = {
  pathTo,
}

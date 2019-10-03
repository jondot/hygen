import { Pathlike, pathToClass } from '../hygen'

class PathTo implements pathToClass  {
  static pathUtil: Pathlike
  basePath: string[]
  constructor(...basePath: string[]) {
    this.basePath = basePath
  }

  // @ts-ignore
  get currentPath() {
    return PathTo.pathUtil.join(...this.basePath)
  }

  add(...paths: string[]): pathTo {
    return new PathTo(...this.basePath, ...paths)
  }
  path(...paths: string[]): string {
    return PathTo.pathUtil.join(...this.basePath, ...paths)
  }
}


module.exports = {
  PathTo,
}



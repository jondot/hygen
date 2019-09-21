export interface Pathlike {
  join: (...args: string[]) => string,
  resolve: (folder: string) => string,
  sep: string,
  win32: Pathlike,
}

export interface pathToUtil {
  pathUtil: Pathlike,
  base: string[],
  currentPath: () => string,
  add: (...paths: string[]) => pathToUtil,
  path: (...paths: string[]) => string,
}

export interface Io {
  path: Pathlike,
  exists: (f: string) => Promise<boolean>,
  load: (f: string) => Promise<object>,
  none: (f: string) => Promise<object>,
}

export interface walkDirUpParams {
  path: Pathlike,
  startAt: string,
  stopAt: string,
  withFile: string,
}
export declare function walkDirUp(walkDirUpParams): string[]

export declare class pathTo {
  constructor(...base: string[])
  pathUtil: Pathlike
  base: string[]

}

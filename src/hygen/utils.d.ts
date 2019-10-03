import { HygenConfig } from './config'
import { HygenResolver } from './resolvers'

export interface Pathlike {
  join: (...args: string[]) => string,
  resolve: (folder: string) => string,
  sep: string,
  win32: Pathlike,
}
declare class pathToClass {
  static pathUtil: Pathlike;
  basePath: Array<string>;
  constructor(base: Array<string>);
  currentPath: () => string;
  add: (...paths: string[]) => pathToClass;
  path: (...paths: string[]) => string;
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
export declare function walkDirUp(params: walkDirUpParams): string[]

export type CreateResolverChainFn = (resolvers: Array<HygenResolver>) => HygenResolver
export type ChainResolver = (chain: Promise<HygenConfig>, resolver: HygenResolver) => Promise<HygenConfig>

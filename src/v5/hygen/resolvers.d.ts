import {HygenConfig} from './config'

export declare interface HygenResolver {
  resolve: resolverFn,
  name: string,
  hooks: string[],
}

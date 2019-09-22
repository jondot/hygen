import {HygenConfig} from './config'

export declare type resolverFn = (config: HygenConfig) => Promise<HygenConfig>

export declare interface HygenResolver {
  resolve: resolverFn,
  name: string,
  hooks: string[],
}

import {HygenConfig} from './config'

export type ResolverFn = (h: HygenConfig) => Promise<HygenConfig>

export declare interface HygenResolver {
  resolve: ResolverFn,
  name: string,
  hooks: string[],
}

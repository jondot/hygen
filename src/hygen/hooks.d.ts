import { HygenConfig } from './config'
import { HygenResolver } from './resolvers'

export type CreateHooksChainFn = (hook: string, config: HygenConfig) => Promise<HygenConfig>

export interface HooksConfig {
  [s: string]: Array<HygenResolver>
}

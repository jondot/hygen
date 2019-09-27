import { HelpersConfig } from './context'

export declare type HygenResolver = HygenConfig => Promise<HygenConfig>

export interface HygenConfig {
  helpers: HelpersConfig
}

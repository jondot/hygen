import { HygenConfig } from './config'

export type CreateHooksChainFn = (hook: string, config: HygenConfig) => Promise<HygenConfig>

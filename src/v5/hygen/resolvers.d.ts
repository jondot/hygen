import {HygenConfig} from './config'

export type HygenResolver = (h: HygenConfig) => Promise<HygenConfig>


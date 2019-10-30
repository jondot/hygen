import { HygenResolver } from '../types'

export const noopResolver: HygenResolver = (config) => Promise.resolve(config)

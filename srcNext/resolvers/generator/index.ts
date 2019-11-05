import { HygenResolver } from '../../types'

export const resolveGenerator: HygenResolver = config => {

  return Promise.resolve(config)
}


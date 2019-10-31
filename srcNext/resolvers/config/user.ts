import { HygenResolver } from '../../types'

export const fetchUser: HygenResolver = (config)  => {
  config.env.logger.notice('fetchUser')

  return Promise.resolve(config)
}
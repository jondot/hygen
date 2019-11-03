import { HygenBuildConfig, UserConfig } from '../../types'

export const fetchUser = (config: HygenBuildConfig): Promise<Array<UserConfig>>  => {
  config.env.logger.notice('fetchUser')

  return Promise.resolve([])
}
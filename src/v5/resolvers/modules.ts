import { HygenConfig } from '../hygen'

export const modulesResolver = (config: HygenConfig): Promise<HygenConfig> => {

  return Promise.resolve(config)
}

export default modulesResolver


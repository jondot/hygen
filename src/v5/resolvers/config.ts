import { HygenConfig } from '../hygen'

/* configResolver is responsible for finding and loading configuration files
   and setting sensible defaults and assigning tools for the rest of the
   hygenConfig
  */
export const configResolver = (config: HygenConfig): Promise<HygenConfig> => {

  //
  return Promise.resolve(config)
}

export default configResolver

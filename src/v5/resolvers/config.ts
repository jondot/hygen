import { HygenConfig, HygenResolver } from '../hygen/index'

/* configResolver is responsible for finding and loading configuration files
   and setting sensible defaults and assigning tools for the rest of the
   hygenConfig
  */
export const configResolver = (config: HygenConfig): Promise<HygenConfig> => {
  // first yargs
  // set logger
  // set tools
  // set helpers
  // find existing `.hygen.js` files
  // load each
  // merge into master config
  // run postConfig hooks
  return Promise.resolve(config)
}

const resolver: HygenResolver = {
  resolver: configResolver,
  name: 'Modules ',
  hooks: ['postConfig'],
}

export default resolver

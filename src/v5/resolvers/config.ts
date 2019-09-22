import { HygenConfig, HygenResolver } from '../hygen/index'
import {yargsResolver} from './yargs'
/* configResolver is responsible for finding and loading configuration files
   and setting sensible defaults and assigning tools for the rest of the
   hygenConfig
  */
export const configResolver = (config: HygenConfig): Promise<HygenConfig> => {
  const p = yargsResolver(config)
  /* run yargs for logger */
  /*   the logger needs logLevel out of argv */
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

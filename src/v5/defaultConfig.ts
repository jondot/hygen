import { HygenConfig } from './hygen'

/* @function create an empty configuration object */
const mkConfig = (): HygenConfig =>
  ({
    configFile: {globalPaths: [], localPaths: [], configFiles: []},
    env: {},
    modules: [],
    directives: [],
    generator: {generator: null, action: null, path: null, templates: [], ignored: [], configFiles: []},
    helpers: {},
    hooks: {},
    logger: undefined,
    options: {},
    params: {},
    tools: {},
  })

const mkConfigPromise = (): Promise<HygenConfig> => Promise.resolve(mkConfig())

module.exports = { mkConfig, mkConfigPromise }

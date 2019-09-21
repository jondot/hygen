import { HygenConfig } from './hygen'

/* @function create an empty configuration object */
const mkConfig = (): HygenConfig =>
  ({
    configFile: {globalPaths: [], localPaths: []},
    env: {},
    modules: [],
    localConfigFilenames: [],
    directives: [],
    generator: {templates: [],ignored: [], paramFiles: []},
    helpers: {},
    hooks: {},
    ignored: { generators: [], actions: [], files: [], patterns: [] },
    logger: undefined,
    options: {},
    params: {},
    templates: [],
    tools: {},
  })

const mkConfigPromise = (): Promise<HygenConfig> => Promise.resolve(mkConfig())

module.exports = { mkConfig, mkConfigPromise }

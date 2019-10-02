import { HygenConfig } from './hygen'

export const mkConfig = (): HygenConfig =>
  ({
    /* information for collecting config from files, and for ignoring them */
    config: {
      /* files to find and read */
      filenames: [
        /* process.env.HYGEN_CONFIG_FILENAME - [index.js, prompt.js] */
        /* process.env.HYGEN_CONFIG_FILE - '/home/carrot/.config/hygen.js' */
        '.hygen.js',
        'hygen.js'
      ],
      hygenIgnore:[/* process.env.HYGEN_IGNORE_FILENAME, */'.hygenignore'],
    },
    /* env contains data about the running environment */
    env: {},
    /* modules is a list of modules to be loaded by moduleResolver */
    modules: [],
    /* directives are specific actions that templates can do */
    /* examples: renderFile, sh, message, user added additions are allowed */
    /* api for a directive to follow */
    directives: [],
    /* specifics about the generator being used */
    generator: {
      generator: null, // name of the generator
      action: null, // name of the action
      path: null, // path to the action directory
      templates: [], // paths to templates for action
      ignored: [], // paths to files that were ignored
      configFiles: [], //paths to files to read as config
    },
    /* available to templates as `h` */
    helpers: {},
    /* resolvers execute hooks during it's lifecycle */
    /* each hook takes a hygenConfig obj and returns a promise to deliver one */
    hooks: {},
    /* used to generate output.  .error, .warning, .verbose, */
    /* .debug, .info, .log, .warn, .error */
    logger: undefined,
    // options: {},
    // the current set of yargs data and the results of processing it
    params: {},
    // programs and constants used across resolvers
    tools: {},
  })

export const mkConfigPromise = (): Promise<HygenConfig> => Promise.resolve(mkConfig())

export default {mkConfig, mkConfigPromise}

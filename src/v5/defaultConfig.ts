import { HygenConfig } from './hygen'

export const mkConfig = (): object =>
  ({
    /* information for collecting config from files, and for ignoring them */
    hygenConfig: {
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
      generator: null,
      action: null,
      path: null,
      templates: [],
      ignored: [],
      configFiles: [],
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

import { HygenConfig } from './hygen'


const mkConfig = (): HygenConfig =>
  ({
    hygenConfig = {
      configFile: {
        templatePaths: ['_templates'], /* where to look for generators */
        globalConfig: {
          files: [], /* specific file(s) to load */
          filenames: ['.hygen.js','hygen.js'],
          searchStart: path.join(cwd, '.hygen.js'),
          searchEnd: '/',
          searchLimit: 1,
        },
        hygenIgnore: {
          filename: ['.hygenignore'],
          searchLimit: 1,
        },
        localConfig: {
          localFilenames: ['.hygen.js','hygen.js'],
          searchLimit: 0,
        },
        templateConfig: {

        }
        ignore: {
          dirs: ['_hygen'],
          files: ['.hygen.js','hygen.js', '.hygenignore'],
          actions: [],
          generators: [],
          templates: [],
        }
      }
    },
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


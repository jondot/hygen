import { HygenConfig, HygenResolver } from '../hygen/index'
// import { chainPromise } from '../utils/chainPromise'

const GLOBAL_SEARCH_FILES = ['.hygenignore','.hygen.js']
const LOCAL_SEARCH_FILES = [...GLOBAL_SEARCH_FILES, 'index.js','prompt.js']

export const generatorResolver = (config: HygenConfig): Promise<HygenConfig> => {
  // HYGEN_FILES [.hygenignore,.hygen.js,index.js,prompt.js]

  // CORE_CYCLE(dir)
  //  find dir directory
  //    catch failing to find dir
  //  directory has contents
  //    catch empty directory
  //  load dir/[HYGEN_FILES]
  //    catch failed loading
  //  check if dir is ignored
  //    catch ignored dir

  // resolve preGenerator hooks
  //   catch failed hook
  // CORE_CYCLE(_templates)
  // CORE_CYCLE(_templates/generator)
  // CORE_CYCLE(_templates/generator/action)
  // check is action is empty
  //   catch no templates
  // create GeneratorConfig Object
  // resolve postGenerator hooks
  return Promise.resolve(config)
}

const resolver: HygenResolver = {
  resolver: generatorResolver,
  name: 'Generator Resolver',
  hooks: ['preGenerator', 'postGenerator'],
}

export default resolver

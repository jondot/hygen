import { runner } from './index'
import { EnvConfig, HygenBuildConfig, IoConfig, ToolsConfig } from './types'

// hygen uses these ENV values
// Directories to search for generators
// HYGEN_TMPLS.split(':') || ['_templates']
// HYGEN_CONFIG.split(':') || ['.hygen.js']
// HYGEN_IGNORE.split(':') || ['.hygenignore']
// HYGEN_PARAMS.split(':') || ['index.js']
// HYGEN_PROMPT.split(':') || ['prompt.js']
// HYGEN_YARGS_MODULE || 'yargs.module.js'
// HYGEN_DEBUG || DEBUG

// initialConfig can be used to set env, io, and tool
// any value not passed in will use the defaults for your os
runner({
  env: {} as Partial<EnvConfig>, // settings for about ENV, paths, files, os
  io: {} as Partial<IoConfig>, // functions to interact with the file system
  tools: {} as Partial<ToolsConfig>,  // functions to enable and extend config, params, prompts and
  // renderers
} as HygenBuildConfig)
  .then(final => console.debug('final config', final.env))
  .catch((err: Error) => console.error(err.message))

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
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
index_1.runner({
    env: {},
    io: {},
    tools: {},
})
    .then(final => console.debug('final config', final.generator.summary))
    .catch((err) => console.error(err.message));
//# sourceMappingURL=bin.js.map
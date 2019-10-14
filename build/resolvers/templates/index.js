"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.templatesResolver = function (config) {
    // resolve preTemplates hooks
    // load all templates in config.generator.template_files
    // parse frontmatter from each using helpers, params, namer
    return Promise.resolve(config);
};
var resolver = {
    resolver: exports.templatesResolver,
    name: 'Templates Resolver',
    hooks: ['preTemplates', 'postTemplates'],
};
exports.default = exports.templatesResolver;

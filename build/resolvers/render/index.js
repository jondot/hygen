"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderResolver = function (config) {
    // resolve preRender hooks
    // resolve preTemplates hooks
    // load all templates in config.generator.template_files
    // parse frontmatter from each
    // assign actions based on frontmatter directives: inject,write,sh,message
    //   ejs templates will use the following in template context
    //     helpers, params, namer, and frontmatter
    // resolve postTemplates hooks
    // resolve postRender hooks
    return Promise.resolve(config);
};
var resolver = {
    resolver: exports.renderResolver,
    name: 'Render Resolver',
    hooks: ['preRender', 'postRender'],
};
exports.default = exports.renderResolver;
exports.templatesResolver = function (config) {
    return Promise.resolve(config);
};
var resolver = {
    resolver: exports.templatesResolver,
    name: 'Templates Resolver',
    hooks: ['preTemplates', 'postTemplates'],
};
exports.default = exports.templatesResolver;

"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("utils");
exports.mkConfig = function (startConfig) { return (__assign(__assign({}, startConfig), { 
    /* information for collecting config from files, and for ignoring them */
    config: {
        /* files to find and read */
        filenames: [
            /* process.env.HYGEN_CONFIG_FILENAME - [index.js, prompt.js] */
            /* process.env.HYGEN_CONFIG_FILE - '/home/carrot/.config/hygen.js' */
            '.hygen.js',
            'hygen.js',
        ],
        hygenIgnore: [/* process.env.HYGEN_IGNORE_FILENAME, */ '.hygenignore'],
    }, 
    /* env contains data about the running environment */
    /* modules is a list of modules to be loaded by moduleResolver */
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
    /* resolvers execute hooks during it's lifecycle */
    /* each hook takes a hygenConfig obj and returns a promise to deliver one */
    hooks: {}, 
    /* used to generate output.  .error, .warning, .verbose, */
    /* .debug, .info, .log, .warn, .error */
    logger: startConfig.logger || utils_1.mkLogger(), 
    // options: {},
    // the current set of yargs data and the results of processing it
    params: {} })); };

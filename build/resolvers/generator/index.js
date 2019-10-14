"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { chainPromise } from '../utils/chainPromise'
var GLOBAL_SEARCH_FILES = ['.hygenignore', '.hygen.js'];
var LOCAL_SEARCH_FILES = __spreadArrays(GLOBAL_SEARCH_FILES, ['index.js', 'prompt.js']);
exports.generatorResolver = function (config) {
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
    return Promise.resolve(config);
};
var resolver = {
    resolver: exports.generatorResolver,
    name: 'Generator Resolver',
    hooks: ['preGenerator', 'postGenerator'],
};
exports.default = resolver;

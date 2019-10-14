"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var yargs_parser_1 = __importDefault(require("yargs-parser"));
var chainCommands = function (baseYargs, commands) {
    return commands.reduce(function (yargs, command) { return yargs.command; });
};
exports.yargsResolver = function (config) {
    // resolve preYargs hooks
    // setup basic parser
    var parser = yargs_parser_1.default(config.env.argv)
        .scriptName('hygen')
        .env('HYGEN')
        .version(false)
        .usage('$0 [global-args] <generator> <action> <name> [args]');
    config.yargs.parser = chainCommands(parser, [
    // help system
    // log/verbosity system
    // global options
    // ...config.hooks.yargsOptions
    ]);
    config.params.yargs = config.yargs.parser.argv;
    // assign argv to config.params.argv
    // resolve postYargs hooks
    return (Promise.resolve(config));
};
exports.default = exports.yargsResolver;

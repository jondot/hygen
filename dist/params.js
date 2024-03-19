"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_ACTION = void 0;
const yargs_parser_1 = __importDefault(require("yargs-parser"));
const prompt_1 = __importDefault(require("./prompt"));
const generators_1 = require("./generators");
const engine_1 = require("./engine");
exports.DEFAULT_ACTION = '_default';
const resolvePositionals = (actionsMap, args) => __awaiter(void 0, void 0, void 0, function* () {
    /*
    we want a to create flexible resolution and allow both:
  
    1. [gen] [action] [NAME]
    2. [gen] [NAME] which, if NAME=action, has a conflict, so goes to the generator with
        an empty name, otherwise -- goes to the new '_default' generator, with a name of 'NAME'
  
    E.g.
    for a template layout of:
    init/
      repo/
      ..
  
    init repo (repo exists, so goes to the repo gen, this is not a default named 'repo'!)
    init repo MyName
    init MyName (default, name=MyName), default because 'repo' does not exist
    init (default, name=[empty]), default always!
    */
    const [generator, action, name] = args;
    if (generator && action && actionsMap.has((0, generators_1.actionKeyFor)(generator, action))) {
        return [generator, action, name];
    }
    if (generator && actionsMap.has((0, generators_1.actionKeyFor)(generator, exports.DEFAULT_ACTION))) {
        return [generator, exports.DEFAULT_ACTION, name];
    }
    return [generator, action, name];
});
const params = (resolvedConfig, externalArgv) => __awaiter(void 0, void 0, void 0, function* () {
    const argv = (0, yargs_parser_1.default)(externalArgv);
    const { templates, conflictResolutionStrategy, createPrompter } = resolvedConfig;
    const { actionsMap } = (0, generators_1.loadGenerators)(templates, conflictResolutionStrategy);
    const [generator, action, name] = yield resolvePositionals(actionsMap, argv._);
    if (!generator || !action) {
        return { generator, action, templates };
    }
    const targetAction = actionsMap.get((0, generators_1.actionKeyFor)(generator, action));
    if (!targetAction) {
        // todo: improve this error
        throw new engine_1.ShowHelpError(`The action ${targetAction} does not exist in the ${generator} generator`);
    }
    const actionFolder = targetAction.path;
    const { _ } = argv, cleanArgv = __rest(argv, ["_"]);
    const promptArgs = yield (0, prompt_1.default)(createPrompter, actionFolder, Object.assign(Object.assign({}, (name ? { name } : {})), cleanArgv));
    const [, subAction] = action.split(':');
    const args = Object.assign({
        templates,
        actionFolder,
        generator,
        action,
        subAction,
    }, 
    // include positionals as special arg for templates to consume,
    // and a unique timestamp for this run
    { _, ts: process.env.HYGEN_TS || new Date().getTime() }, cleanArgv, name && { name }, promptArgs);
    return args;
});
exports.default = params;

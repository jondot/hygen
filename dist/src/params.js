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
const path_1 = __importDefault(require("path"));
const yargs_parser_1 = __importDefault(require("yargs-parser"));
const prompt_1 = __importDefault(require("./prompt"));
const params = ({ templates, createPrompter }, externalArgv) => __awaiter(void 0, void 0, void 0, function* () {
    const argv = yargs_parser_1.default(externalArgv);
    const [generator, action, name] = argv._;
    if (!generator || !action) {
        return { generator, action, templates };
    }
    const [mainAction, subaction] = action.split(':');
    const actionfolder = path_1.default.join(templates, generator, mainAction);
    const { _ } = argv, cleanArgv = __rest(argv, ["_"]);
    const promptArgs = yield prompt_1.default(createPrompter, actionfolder, Object.assign(Object.assign({}, (name ? { name } : {})), cleanArgv));
    const args = Object.assign(Object.assign(Object.assign({ templates,
        actionfolder,
        generator,
        action,
        subaction }, cleanArgv), (name ? { name } : {})), promptArgs);
    return args;
});
exports.default = params;
//# sourceMappingURL=params.js.map
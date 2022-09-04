"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const helpers_1 = __importDefault(require("./helpers"));
const hooksfiles = [
    'index.js',
    'index.ts',
    'prompt.cjs',
    'prompt.js',
    'prompt.ts',
];
const prompt = (createPrompter, actionfolder, args) => __awaiter(void 0, void 0, void 0, function* () {
    const hooksfile = hooksfiles
        .map((f) => path_1.default.resolve(path_1.default.join(actionfolder, f)))
        .find((f) => fs_1.default.existsSync(f));
    if (!hooksfile) {
        return Promise.resolve({});
    }
    const isTypeScriptHook = /\.ts$/.test(hooksfile);
    // Lazily support TS hook files
    if (isTypeScriptHook) {
        require('ts-node/register/transpile-only');
    }
    // shortcircuit without prompter
    let hooksModule = yield Promise.resolve().then(() => __importStar(require(hooksfile)));
    if (hooksModule.default) {
        hooksModule = hooksModule.default;
    }
    if (hooksModule.params) {
        return hooksModule.params({ args, h: helpers_1.default });
    }
    // lazy loads prompter
    // everything below requires it
    const prompter = createPrompter();
    if (hooksModule.prompt) {
        return hooksModule.prompt({
            prompter,
            inquirer: prompter,
            args,
            h: helpers_1.default,
        });
    }
    return prompter.prompt(
    // prompt _only_ for things we've not seen on the CLI
    hooksModule.filter((p) => args[p.name] === undefined ||
        args[p.name] === null ||
        args[p.name].length === 0));
});
exports.default = prompt;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const hooksfiles = ['prompt.js', 'index.js'];
const prompt = (createPrompter, actionfolder, args) => {
    const hooksfile = hooksfiles
        .map(f => path_1.default.resolve(path_1.default.join(actionfolder, f)))
        .find(f => fs_1.default.existsSync(f));
    if (!hooksfile) {
        return Promise.resolve({});
    }
    // shortcircuit without prompter
    // $FlowFixMe
    const hooksModule = require(hooksfile);
    if (hooksModule.params) {
        return hooksModule.params({ args });
    }
    // lazy loads prompter
    // everything below requires it
    const prompter = createPrompter();
    if (hooksModule.prompt) {
        return hooksModule.prompt({ prompter, inquirer: prompter, args });
    }
    return prompter.prompt(
    // prompt _only_ for things we've not seen on the CLI
    hooksModule.filter(p => args[p.name] === undefined ||
        args[p.name] === null ||
        args[p.name].length === 0));
};
exports.default = prompt;
//# sourceMappingURL=prompt.js.map
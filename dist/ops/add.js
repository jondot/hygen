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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const result_1 = __importDefault(require("./result"));
const path = require('path');
const fs = require('fs-extra');
const { red } = require('chalk');
const add = (action, args, { logger, cwd, createPrompter }) => __awaiter(void 0, void 0, void 0, function* () {
    const { attributes: { to, inject, unless_exists }, } = action;
    const result = result_1.default('add', to);
    const prompter = createPrompter();
    if (!to || inject) {
        return result('ignored');
    }
    const absTo = path.resolve(cwd, to);
    const shouldNotOverwrite = unless_exists !== undefined && unless_exists === true;
    if (!process.env.HYGEN_OVERWRITE && (yield fs.exists(absTo))) {
        if (shouldNotOverwrite ||
            !(yield prompter
                .prompt({
                prefix: '',
                type: 'confirm',
                name: 'overwrite',
                message: red(`     exists: ${to}. Overwrite? (y/N): `),
            })
                .then(({ overwrite }) => overwrite))) {
            logger.warn(`     skipped: ${to}`);
            return result('skipped');
        }
    }
    if (!args.dry) {
        yield fs.ensureDir(path.dirname(absTo));
        yield fs.writeFile(absTo, action.body);
    }
    logger.ok(`       added: ${to}`);
    return result('added');
});
exports.default = add;
//# sourceMappingURL=add.js.map
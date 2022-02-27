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
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const chalk_1 = require("chalk");
const result_1 = __importDefault(require("./result"));
const add = (action, args, { logger, cwd, createPrompter }) => __awaiter(void 0, void 0, void 0, function* () {
    const { attributes: { to, inject, unless_exists, force, from, skip_if }, } = action;
    const result = (0, result_1.default)('add', to);
    const prompter = createPrompter();
    if (!to || inject) {
        return result('ignored');
    }
    const absTo = path_1.default.resolve(cwd, to);
    const shouldNotOverwrite = !force && unless_exists !== undefined && unless_exists === true;
    const fileExists = yield fs_extra_1.default.exists(absTo);
    if (shouldNotOverwrite && fileExists) {
        logger.warn(`     skipped: ${to}`);
        return result('skipped');
    }
    if (!process.env.HYGEN_OVERWRITE && fileExists && !force) {
        if (!(yield prompter
            .prompt({
            prefix: '',
            type: 'confirm',
            name: 'overwrite',
            message: (0, chalk_1.red)(`     exists: ${to}. Overwrite? (y/N): `),
        })
            .then(({ overwrite }) => overwrite))) {
            logger.warn(`     skipped: ${to}`);
            return result('skipped');
        }
    }
    const shouldSkip = skip_if === 'true';
    if (shouldSkip) {
        return result('skipped');
    }
    if (from) {
        const from_path = path_1.default.join(args.templates, from);
        const file = fs_extra_1.default.readFileSync(from_path).toString();
        action.body = file;
    }
    if (!args.dry) {
        yield fs_extra_1.default.ensureDir(path_1.default.dirname(absTo));
        yield fs_extra_1.default.writeFile(absTo, action.body);
    }
    const pathToLog = process.env.HYGEN_OUTPUT_ABS_PATH ? absTo : to;
    logger.ok(`       ${force ? 'FORCED' : 'added'}: ${pathToLog}`);
    return result('added');
});
exports.default = add;

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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
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
const fs_extra_1 = __importDefault(require("fs-extra"));
const params_1 = __importDefault(require("../params"));
const errors_1 = require("../errors");
const getHelp = () => `
Usage:
  hygen [option] GENERATOR ACTION [--name NAME] [data-options]

Options:
  -h, --help # Show this message and quit
  --dry      # Perform a dry run.  Files will be generated but not saved.`;
const engine = (argv, config) => __awaiter(void 0, void 0, void 0, function* () {
    const { cwd, templates, logger } = config;
    const args = Object.assign(yield params_1.default(config, argv), { cwd });
    const { generator, action, actionfolder } = args;
    if (['-h', '--help'].includes(argv[0])) {
        logger.log(getHelp());
        process.exit(0);
    }
    logger.log(args.dry ? '(dry mode)' : '');
    if (!generator) {
        throw errors_1.getNoGeneratorError();
    }
    if (!action) {
        throw errors_1.getNoActionError();
    }
    logger.log(`Loaded templates: ${templates.replace(`${cwd}/`, '')}`);
    if (!(yield fs_extra_1.default.exists(actionfolder))) {
        throw errors_1.getActionNotFoundError(generator, action);
    }
    // lazy loading these dependencies gives a better feel once
    // a user is exploring hygen (not specifying what to execute)
    const execute = (yield Promise.resolve().then(() => __importStar(require('../execute')))).default;
    const render = (yield Promise.resolve().then(() => __importStar(require('../render')))).default;
    const renderedActions = yield render(args, config);
    return execute(renderedActions, args, config);
});
var errors_2 = require("../errors");
Object.defineProperty(exports, "ShowHelpError", { enumerable: true, get: function () { return errors_2.ShowHelpError; } });
exports.default = engine;
//# sourceMappingURL=index.js.map
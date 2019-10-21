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
const fs_extra_1 = __importDefault(require("fs-extra"));
const params_1 = __importDefault(require("./params"));
const engine = (argv, config) => __awaiter(void 0, void 0, void 0, function* () {
    const { cwd, templates, logger } = config;
    const args = Object.assign(yield params_1.default(config, argv), { cwd });
    const { generator, action, actionfolder } = args;
    if (['-h', '--help'].includes(argv[0])) {
        logger.log(`
Usage:
  hygen [option] GENERATOR ACTION [--name NAME] [data-options]

Options:
  -h, --help # Show this message and quit
  --dry      # Perform a dry run.  Files will be generated but not saved.`);
        process.exit(0);
    }
    logger.log(args.dry ? '(dry mode)' : '');
    if (!generator) {
        throw new Error('please specify a generator.');
    }
    if (!action) {
        throw new Error(`please specify an action for ${generator}.`);
    }
    logger.log(`Loaded templates: ${templates.replace(`${cwd}/`, '')}`);
    if (!(yield fs_extra_1.default.exists(actionfolder))) {
        throw new Error(`I can't find action '${action}' for generator '${generator}'.

      You can try:
      1. 'hygen init self' to initialize your project, and
      2. 'hygen generator new --name ${generator}' to build the generator you wanted.

      Check out the quickstart for more: http://www.hygen.io/quick-start
      `);
    }
    // lazy loading these dependencies gives a better feel once
    // a user is exploring hygen (not specifying what to execute)
    const execute = require('./execute');
    const render = require('./render');
    return execute(yield render(args, config), args, config);
});
exports.default = engine;
//# sourceMappingURL=engine.js.map
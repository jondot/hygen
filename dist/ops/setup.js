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
const debug_1 = __importDefault(require("debug"));
const degit_1 = __importDefault(require("degit"));
const result_1 = __importDefault(require("./result"));
const debug = (0, debug_1.default)('hygen:ops:setup');
/*
XXX:
- Name -> target directory
- setup -> rename to 'from'?
-  --setup|from argument overrides setup
-  --mode argument
-  --verbose, --cache
XXX:
- testing infra: when focus added ignore snapshots
- better ignoring when focusing?
- better separation to individual tests?, rework test generation

*/
const notEmpty = (x) => x && x.length > 0;
const setup = ({ attributes: { setup, mode, verbose, force } }, args, { logger, cwd }) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (0, result_1.default)('setup', setup);
    if (notEmpty(setup)) {
        if (!setup.includes('/')) {
            throw new Error(`'${setup}' must be a repo`);
        }
        const to = args.to || '.';
        const payload = {
            setup,
            mode: mode || 'tar',
            verbose: !!verbose,
            force: !!args.force || !!force,
            to: path_1.default.resolve(cwd, to),
        };
        if (!args.dry) {
            try {
                debug('exec %o %o', setup, payload);
                const d = (0, degit_1.default)(setup, {
                    mode: payload.mode,
                    force: payload.force,
                    verbose: payload.verbose,
                });
                yield d.clone(payload.to);
                debug('done');
                logger.ok(`       setup: ${setup} -> ${to}`);
            }
            catch (error) {
                debug('error %o', error);
                logger.err(`       setup: ${setup} ${error}`);
            }
        }
        else {
            logger.ok(`       setup: ${setup} -> ${to}`);
        }
        return result('executed', payload);
    }
    return result('ignored');
});
exports.default = setup;

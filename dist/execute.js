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
const debug_1 = __importDefault(require("debug"));
const ops_1 = __importDefault(require("./ops"));
const debug = (0, debug_1.default)('hygen:execute');
const execute = (renderedActions, args, config) => __awaiter(void 0, void 0, void 0, function* () {
    const { logger } = config;
    const messages = [];
    const results = [];
    for (const action of renderedActions) {
        const { message } = action.attributes;
        if (message) {
            messages.push(message);
        }
        const ops = yield (0, ops_1.default)(action.attributes);
        debug('executing %o ops', ops.length);
        for (const op of ops) {
            debug('executing: %o', op);
            results.push(yield op(action, args, config));
        }
        debug('executing ops: done');
    }
    if (messages.length > 0) {
        logger.colorful(`${args.action}:\n${messages.join('\n')}`);
    }
    return results;
});
exports.default = execute;

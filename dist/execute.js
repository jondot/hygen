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
const ops_1 = __importDefault(require("./ops"));
const execute = (renderedActions, args, config) => __awaiter(void 0, void 0, void 0, function* () {
    const { logger } = config;
    const messages = [];
    const results = [];
    for (const action of renderedActions) {
        const { message } = action.attributes;
        if (message) {
            messages.push(message);
        }
        const ops = ops_1.default(action.attributes);
        for (const op of ops) {
            results.push(yield op(action, args, config));
        }
    }
    if (messages.length > 0) {
        logger.colorful(`${args.action}:\n${messages.join('\n')}`);
    }
    return results;
});
module.exports = execute;
//# sourceMappingURL=execute.js.map
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
const fs = require('fs-extra');
const path = require('path');
const injector = require('./injector');
const injectOp = (action, args, { logger, cwd }) => __awaiter(void 0, void 0, void 0, function* () {
    const { attributes: { to, inject }, } = action;
    const result = result_1.default('inject', to);
    if (!(inject && to)) {
        return result('ignored');
    }
    const absTo = path.resolve(cwd, to);
    if (!(yield fs.exists(absTo))) {
        logger.err(`Cannot inject to ${to}: doesn't exist.`);
        return result('error', {
            error: `Cannot inject to ${to}: doesn't exist.`,
        });
    }
    const content = (yield fs.readFile(absTo)).toString();
    const injectResult = injector(action, content);
    if (!args.dry) {
        yield fs.writeFile(absTo, injectResult);
    }
    logger.notice(`      inject: ${to}`);
    return result('inject');
});
exports.default = injectOp;
//# sourceMappingURL=inject.js.map
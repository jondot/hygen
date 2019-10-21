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
const path_1 = __importDefault(require("path"));
const result_1 = __importDefault(require("./result"));
const injector_1 = __importDefault(require("./injector"));
const injectOp = (action, args, { logger, cwd }) => __awaiter(void 0, void 0, void 0, function* () {
    const { attributes: { to, inject }, } = action;
    const result = result_1.default('inject', to);
    if (!(inject && to)) {
        return result('ignored');
    }
    const absTo = path_1.default.resolve(cwd, to);
    if (!(yield fs_extra_1.default.exists(absTo))) {
        logger.err(`Cannot inject to ${to}: doesn't exist.`);
        return result('error', {
            error: `Cannot inject to ${to}: doesn't exist.`,
        });
    }
    const content = (yield fs_extra_1.default.readFile(absTo)).toString();
    const injectResult = injector_1.default(action, content);
    if (!args.dry) {
        yield fs_extra_1.default.writeFile(absTo, injectResult);
    }
    logger.notice(`      inject: ${to}`);
    return result('inject');
});
exports.default = injectOp;
//# sourceMappingURL=inject.js.map
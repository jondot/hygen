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
const result_1 = __importDefault(require("./result"));
const injector_1 = __importDefault(require("./injector"));
const injectOp = (action, args, { logger, cwd }) => __awaiter(void 0, void 0, void 0, function* () {
    logger.log('inject');
    const { attributes: { to, inject }, } = action;
    const result = (0, result_1.default)('inject', to);
    if (!(inject && to)) {
        return result('ignored');
    }
    const absTo = path_1.default.resolve(cwd, to);
    if (!(yield fs_extra_1.default.exists(absTo))) {
        logger.warn(`${to} doesn't exist, now creating file`);
        fs_extra_1.default.ensureFileSync(absTo);
        logger.ok(`${to} was successfuly created`);
    }
    const content = (yield fs_extra_1.default.readFile(absTo)).toString();
    const injectResult = (0, injector_1.default)(action, content);
    if (!args.dry) {
        yield fs_extra_1.default.writeFile(absTo, injectResult);
    }
    const pathToLog = process.env.HYGEN_OUTPUT_ABS_PATH ? absTo : to;
    logger.notice(`      inject: ${pathToLog}`);
    return result('inject');
});
exports.default = injectOp;

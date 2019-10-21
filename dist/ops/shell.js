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
const notEmpty = x => x && x.length > 0;
const shell = ({ attributes: { sh }, body }, args, { logger, exec }) => __awaiter(void 0, void 0, void 0, function* () {
    const result = result_1.default('shell', sh);
    if (notEmpty(sh)) {
        if (!args.dry) {
            yield exec(sh, body);
        }
        logger.ok(`       shell: ${sh}`);
        return result('executed');
    }
    return result('ignored');
});
exports.default = shell;
//# sourceMappingURL=shell.js.map
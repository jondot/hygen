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
const config_1 = require("./config");
const configResolver = new config_1.ConfigResolver('.hygen.js', {
    exists: fs_extra_1.default.exists,
    // $FlowFixMe
    load: f => Promise.resolve(require(f)),
    none: _ => ({}),
});
exports.default = (config) => __awaiter(void 0, void 0, void 0, function* () {
    const { cwd, templates } = config;
    const resolvedTemplates = [process.env.HYGEN_TMPLS, path_1.default.join(cwd, '_templates')].find(_ => _ && fs_extra_1.default.existsSync(_)) || templates;
    return Object.assign(Object.assign(Object.assign({}, config), { templates: resolvedTemplates }), (yield configResolver.resolve(cwd)));
});
//# sourceMappingURL=config-resolver.js.map
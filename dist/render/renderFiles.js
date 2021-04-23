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
const ejs_1 = __importDefault(require("ejs"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const front_matter_1 = __importDefault(require("front-matter"));
const context_1 = __importDefault(require("../context"));
const readFiles = (files) => {
    return Promise.all(files.map((file) => {
        return fs_extra_1.default.readFile(file).then((text) => ({ file, text: text.toString() }));
    }));
};
const renderTemplate = (tmpl, locals, config) => {
    const renderContext = context_1.default(locals, config);
    return typeof tmpl === 'string'
        ? // TODO: hotfix for ejs template relative include which crash if no filename
            // should find a better way
            ejs_1.default.render(tmpl, renderContext.filename
                ? renderContext
                : Object.assign(Object.assign({}, renderContext), { filename: 'unknown' }))
        : tmpl;
};
const renderAttrs = (attributes, args, config) => {
    return Object.entries(attributes).reduce((obj, [key, value]) => {
        return Object.assign(Object.assign({}, obj), { [key]: renderTemplate(value, args, config) });
    }, {});
};
const renderFiles = (files, args, config) => __awaiter(void 0, void 0, void 0, function* () {
    const fileDatas = yield readFiles(files);
    const filesFrontmatted = fileDatas.map(({ file, text }) => (Object.assign({ file }, front_matter_1.default(text, { allowUnsafe: true }))));
    const promises = filesFrontmatted.map(({ file, attributes, body }) => __awaiter(void 0, void 0, void 0, function* () {
        const renderedAttrs = renderAttrs(attributes, args, config);
        const renderedAction = {
            file,
            attributes: renderedAttrs,
            body: renderTemplate(body, Object.assign(Object.assign({}, args), { attributes: renderedAttrs }), config),
        };
        return renderedAction;
    }));
    return Promise.all(promises);
});
exports.default = renderFiles;
//# sourceMappingURL=renderFiles.js.map
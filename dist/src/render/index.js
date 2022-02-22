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
const ignore_walk_1 = __importDefault(require("ignore-walk"));
const renderFiles_1 = __importDefault(require("./renderFiles"));
const ignores = [
    'prompt.js',
    'index.js',
    '.hygenignore',
    '.DS_Store',
    '.Spotlight-V100',
    '.Trashes',
    'ehthumbs.db',
    'Thumbs.db',
];
function getFiles(dir) {
    return __awaiter(this, void 0, void 0, function* () {
        const files = ignore_walk_1.default
            .sync({ path: dir, ignoreFiles: ['.hygenignore'] })
            .map((f) => path_1.default.join(dir, f));
        return files;
    });
}
const filterFiles = (files, args) => {
    const filteredFiles = files
        .sort((a, b) => a.localeCompare(b)) // TODO: add a test to verify this sort
        .filter((f) => !ignores.find((ig) => f.endsWith(ig))); // TODO: add a
    // test for ignoring prompt.js and index.js
    return args.subaction
        ? filteredFiles.filter((file) => file.replace(args.actionfolder, '').match(args.subaction))
        : filteredFiles;
};
const render = (args, config) => __awaiter(void 0, void 0, void 0, function* () {
    const files = yield getFiles(args.actionfolder);
    const filteredFiles = filterFiles(files, args);
    return renderFiles_1.default(filteredFiles, args, config);
});
exports.default = render;
//# sourceMappingURL=index.js.map
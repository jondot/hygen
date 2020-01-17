"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs-extra"));
const path = __importStar(require("path"));
const shellFunction = (action, body) => {
    const opts = body && body.length > 0 ? { input: body } : {};
    return require('execa').shell(action, opts);
};
const asyncRequire = (pkg) => Promise.resolve(require(pkg))
    .catch(err => {
    console.error(`Config file loading Error: ${pkg}`);
    throw err;
});
// no idea if this works yet
const defaultIoWin32 = {
    path: path.win32,
};
const defaultIoPosix = {
    path: path,
};
const defaultCommonIo = {
    load: asyncRequire,
    consoleWrite: (...msg) => console.log(...msg),
    exec: shellFunction,
    none: () => Promise.resolve({}),
    exists: fs.pathExists,
};
exports.resolveIo = config => {
    config.io = (Object.assign(Object.assign(Object.assign({}, (config.env.platform === 'win32' ? defaultIoWin32 : defaultIoPosix)), defaultCommonIo), config.io));
    return Promise.resolve(config);
};
//# sourceMappingURL=io.js.map
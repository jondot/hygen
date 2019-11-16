"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const os = __importStar(require("os"));
function arrayFromEnv(value, separator = ':') {
    if (!value)
        return false;
    return (Array.isArray(value)) ? value : value.split(separator);
}
exports.resolveEnv = config => {
    config.env = Object.assign({ argv: process.argv.slice(2), configFile: arrayFromEnv(process.env.HYGEN_CONFIG) || ['.hygen.js'], cwd: process.cwd(), debug: !!process.env.HYGEN_DEBUG || !!process.env.DEBUG, ignoreFile: arrayFromEnv(process.env.HYGEN_IGNORE) || ['.hygenignore'], notTemplateFiles: [], paramsFile: arrayFromEnv(process.env.HYGEN_PARAMS) || ['index.js'], platform: process.env.HYGEN_OS || os.platform(), promptFile: arrayFromEnv(process.env.HYGEN_PARAMS) || ['index.js'], templates: arrayFromEnv(process.env.HYGEN_TMPLS) || ['_templates'], yargsModuleFile: process.env.HYGEN_YARGS_MODULE || 'yargs.module.js', yargsModuleExt: 'yargs.module.js'.match('\.(.[^.]$)')[1] }, (config.env || {}));
    config.env.notTemplateFiles = [
        ...config.env.ignoreFile,
        ...config.env.paramsFile,
        ...config.env.promptFile,
        config.env.yargsModuleFile,
    ];
    config.inits = [];
    config.params = [];
    config.prompts = [];
    config.yargs = [];
    config.args = {};
    return Promise.resolve(config);
};
//# sourceMappingURL=env.js.map
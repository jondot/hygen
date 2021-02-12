"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.VERSION = exports.availableActions = exports.printHelp = exports.resolve = exports.engine = exports.runner = void 0;
const config_resolver_1 = __importDefault(require("./config-resolver"));
exports.resolve = config_resolver_1.default;
const engine_1 = __importStar(require("./engine"));
exports.engine = engine_1.default;
const help_1 = require("./help");
Object.defineProperty(exports, "printHelp", { enumerable: true, get: function () { return help_1.printHelp; } });
Object.defineProperty(exports, "availableActions", { enumerable: true, get: function () { return help_1.availableActions; } });
Object.defineProperty(exports, "VERSION", { enumerable: true, get: function () { return help_1.VERSION; } });
const runner = (argv, config) => __awaiter(void 0, void 0, void 0, function* () {
    const resolvedConfig = yield config_resolver_1.default(config);
    const { templates, logger } = resolvedConfig;
    try {
        const actions = yield engine_1.default(argv, resolvedConfig);
        return { success: true, actions, time: 0 };
    }
    catch (error) {
        logger.log(error.toString());
        if (resolvedConfig.debug) {
            logger.log('details -----------');
            logger.log(error.stack);
            logger.log('-------------------');
        }
        if (error instanceof engine_1.ShowHelpError) {
            help_1.printHelp(templates, logger);
        }
        return { success: false, actions: [], time: 0 };
    }
});
exports.runner = runner;
//# sourceMappingURL=index.js.map
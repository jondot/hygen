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
exports.availableActions = exports.printHelp = exports.resolve = exports.engine = exports.runner = void 0;
const config_resolver_1 = __importDefault(require("./config-resolver"));
exports.resolve = config_resolver_1.default;
const engine_1 = __importDefault(require("./engine"));
exports.engine = engine_1.default;
const help_1 = require("./help");
Object.defineProperty(exports, "printHelp", { enumerable: true, get: function () { return help_1.printHelp; } });
Object.defineProperty(exports, "availableActions", { enumerable: true, get: function () { return help_1.availableActions; } });
const runner = (argv, config) => __awaiter(void 0, void 0, void 0, function* () {
    const resolvedConfig = yield config_resolver_1.default(config);
    const { templates, logger } = resolvedConfig;
    try {
        const actions = yield engine_1.default(argv, resolvedConfig);
        return { success: true, actions, time: 0 };
    }
    catch (err) {
        logger.log(err.toString());
        if (resolvedConfig.debug) {
            logger.log('details -----------');
            logger.log(err.stack);
            logger.log('-------------------');
        }
        help_1.printHelp(templates, logger);
        return { success: false, actions: [], time: 0 };
        // process.exit(1)
    }
});
exports.runner = runner;
//# sourceMappingURL=index.js.map
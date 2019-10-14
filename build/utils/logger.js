"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var yargs_1 = __importDefault(require("yargs"));
var chalk_1 = __importDefault(require("chalk"));
var loggerYargsOptions = {
    logLevel: {
        default: 2,
        describe: 'log level between 1(trace) and 5(silent)',
        type: 'number',
    },
    trace: {
        alias: 'vvv',
        describe: '[logLevel: 0] show absolutely every thing going on (long!)',
        type: 'boolean',
    },
    debug: {
        alias: 'vv',
        describe: '[logLevel: 1] show summaries of data',
        type: 'boolean',
    },
    verbose: {
        alias: ['v'],
        type: 'boolean',
        describe: '[logLevel: 2] Extra information, default setting',
    },
    quiet: {
        alias: ['q'],
        describe: '[logLevel: 3] Show only warnings and errors',
        type: 'boolean',
    },
    error: {
        alias: ['err'],
        describe: '[logLevel: 4] Show only errors',
        type: 'boolean',
    },
    silent: {
        alias: 's',
        describe: '[logLevel: 5] no output',
        type: 'boolean',
    },
};
// import * as templates from 'chalk/templates'
var yellow = chalk_1.default.yellow, red = chalk_1.default.red, green = chalk_1.default.green, magenta = chalk_1.default.magenta, cyan = chalk_1.default.cyan, white = chalk_1.default.white, gray = chalk_1.default.gray;
exports.CHALK_MAPPING = {
    trace: gray,
    debug: cyan,
    info: magenta,
    warn: yellow,
    error: red,
    log: white,
    ok: green,
    notice: cyan,
    verbose: white,
};
exports.LOG_LEVELS = [
    'trace',
    'debug',
    'info',
    'log',
    'warn',
    'error',
    'silent',
];
var LEVEL_EQUIVALENTS = {
    ok: 2,
    notice: 2,
};
exports.mkLogger = function (env) {
    var loggerYargs = yargs_1.default
        .env('HYGEN')
        .options(loggerYargsOptions);
    console.log(loggerYargs);
    return new Logger(console.log.bind(console), env);
};
// silent no output at all
// quiet only short error messages
// warn only short warning messages
// info standard messages
// verbose standard messages with more details
// debug dumps at keys spots
// trace ignore
// log
var Logger = /** @class */ (function () {
    function Logger(log, yargs, mappings) {
        var _this = this;
        if (yargs === void 0) { yargs = {}; }
        if (mappings === void 0) { mappings = exports.CHALK_MAPPING; }
        this.logLevel = 2;
        this.levelFor = function (level) {
            if (exports.LOG_LEVELS.indexOf(level) >= 0)
                return exports.LOG_LEVELS.indexOf(level);
            return LEVEL_EQUIVALENTS[level] || 2;
        };
        this.logLevelFrom = function (params) {
            if (params.logLevel)
                return params.logLevel;
            if (params.silent)
                return 5;
            if (params.quiet)
                return 4;
            if (params.warn)
                return 3;
            if (params.debug || process.env.DEBUG)
                return 1;
            if (params.trace)
                return 0;
            return 2;
        };
        this.yargs = yargs;
        this.log = log;
        this.mappings = mappings;
        this.logLevels = exports.LOG_LEVELS;
        this.setLevelFrom(yargs);
        Object.entries(this.mappings).forEach(function (_a) {
            var logType = _a[0], formatter = _a[1];
            var typeLevel = _this.levelFor(logType);
            _this[logType] = function () {
                var msg = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    msg[_i] = arguments[_i];
                }
                if (typeLevel >= this.logLevel)
                    return log(formatter.apply(void 0, msg));
                return null;
            };
        });
    }
    Logger.prototype.setLevelFrom = function (yargs) {
        this.logLevel = this.logLevelFrom(yargs);
    };
    Logger.prototype.colorful = function (msg) {
        // this.log(template(chalk, msg))
    };
    return Logger;
}());
exports.Logger = Logger;

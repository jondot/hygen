var chalk = require('chalk');
var yellow = chalk.yellow, red = chalk.red, green = chalk.green, magenta = chalk.magenta, cyan = chalk.cyan, white = chalk.white, gray = chalk.gray;
var template = require('chalk/templates');
var CHALK_MAPPING = {
    trace: gray,
    debug: cyan,
    err: red,
    error: red,
    info: magenta,
    ok: green,
    silent: function () { return null; },
    verbose: white,
    warn: yellow
};
var LOG_LEVELS = ['trace', 'debug', 'info', 'warn', 'error', 'silent'];
var LEVEL_EQUIVALENTS = {
    err: 4,
    ok: 2
};
var mkLogger = function (env) { return new Logger(console.log.bind(console), env); };
var Logger = /** @class */ (function () {
    function Logger(log, env, mappings) {
        var _this = this;
        if (mappings === void 0) { mappings = CHALK_MAPPING; }
        this.levelFor = function (level) {
            if (LOG_LEVELS.indexOf(level) >= 0)
                return LOG_LEVELS.indexOf(level);
            return LEVEL_EQUIVALENTS[level] || 2;
        };
        this.logLevelFrom = function (params) {
            if (params.logLevel)
                return params.logLevel;
            if (params.s || params.silent)
                return 5;
            if (params.q || params.quiet)
                return 4;
            if (params.warn)
                return 3;
            if (params.debug || process.env.DEBUG)
                return 1;
            if (params.trace)
                return 0;
            return 2;
        };
        this.yargs = env.yargs || {};
        this.log = log;
        this.mappings = mappings;
        this.logLevels = LOG_LEVELS;
        this.setLevelFrom(this.yargs);
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
        this.log(template(chalk, msg));
    };
    return Logger;
}());
module.exports = { Logger: Logger, mkLogger: mkLogger };

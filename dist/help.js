"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VERSION = exports.printHelp = exports.availableActions = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var chalk_1 = __importDefault(require("chalk"));
var params_1 = require("./params");
var pkg = require('../package.json'); // eslint-disable-line @typescript-eslint/no-var-requires
var VERSION = pkg.version;
exports.VERSION = VERSION;
var availableActions = function (templates) {
    var generators = fs_1.default
        .readdirSync(templates)
        .filter(function (_) { return fs_1.default.lstatSync(path_1.default.join(templates, _)).isDirectory(); });
    return generators.reduce(function (acc, generator) {
        var actions = fs_1.default.readdirSync(path_1.default.join(templates, generator));
        acc[generator] = actions;
        return acc;
    }, {});
};
exports.availableActions = availableActions;
var printHelp = function (templates, logger) {
    logger.log("Hygen v".concat(VERSION));
    logger.log('\nAvailable actions:');
    if (!templates) {
        logger.log("No generators or actions found. \n\n      This means I didn't find a _templates folder right here, \n      or anywhere up the folder tree starting here.\n\n      Here's how to start using Hygen:\n\n      $ hygen init self\n      $ hygen with-prompt new --name my-generator\n\n      (edit your generator in _templates/my-generator)\n\n      $ hygen my-generator \n\n      See https://hygen.io for more.\n      \n      ");
        return;
    }
    Object.entries(availableActions(templates)).forEach(function (_a) {
        var k = _a[0], v = _a[1];
        logger.log("".concat(chalk_1.default.bold(k), ": ").concat(v.find(function (a) { return a === params_1.DEFAULT_ACTION; })
            ? "".concat(k).concat(v.length > 1 ? ',' : '', " ")
            : '').concat(v
            .filter(function (a) { return a !== params_1.DEFAULT_ACTION; })
            .map(function (a) { return "".concat(k, " ").concat(a); })
            .join(', ')));
    });
};
exports.printHelp = printHelp;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VERSION = exports.printHelp = exports.availableActions = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const errors_1 = require("./errors");
const VERSION = '6.0.3';
exports.VERSION = VERSION;
const availableActions = (templates) => {
    const generators = fs_1.default
        .readdirSync(templates)
        .filter((_) => fs_1.default.lstatSync(path_1.default.join(templates, _)).isDirectory());
    return generators.reduce((acc, generator) => {
        const actions = fs_1.default.readdirSync(path_1.default.join(templates, generator));
        acc[generator] = actions;
        return acc;
    }, {});
};
exports.availableActions = availableActions;
const printHelp = (templates, logger) => {
    logger.log(`Hygen v${VERSION}`);
    logger.log('\nAvailable actions:');
    if (!templates) {
        logger.log(errors_1.getNoGeneratorsFoundMessage());
        return;
    }
    Object.entries(availableActions(templates)).forEach(([k, v]) => {
        logger.log(`${chalk_1.default.bold(k)}: ${v.join(', ')}`);
    });
};
exports.printHelp = printHelp;
//# sourceMappingURL=index.js.map
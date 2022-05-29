"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VERSION = exports.printHelp = exports.availableActions = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const params_1 = require("./params");
const pkg = require('../package.json'); // eslint-disable-line @typescript-eslint/no-var-requires
const VERSION = pkg.version;
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
        logger.log(`No generators or actions found. 

      This means I didn't find a _templates folder right here, 
      or anywhere up the folder tree starting here.

      Here's how to start using Hygen:

      $ hygen init self
      $ hygen with-prompt new --name my-generator

      (edit your generator in _templates/my-generator)

      $ hygen my-generator 

      See http://hygen.io for more.
      
      `);
        return;
    }
    Object.entries(availableActions(templates)).forEach(([k, v]) => {
        logger.log(`${chalk_1.default.bold(k)}: ${v.find((a) => a === params_1.DEFAULT_ACTION)
            ? `${k}${v.length > 1 ? ',' : ''} `
            : ''}${v
            .filter((a) => a !== params_1.DEFAULT_ACTION)
            .map((a) => `${k} ${a}`)
            .join(', ')}`);
    });
};
exports.printHelp = printHelp;

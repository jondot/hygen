"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VERSION = exports.printHelp = exports.availableActions = void 0;
const chalk_1 = require("chalk");
const params_1 = require("./params");
const generators_1 = require("./generators");
const types_1 = require("./types");
const pkg = require('../package.json'); // eslint-disable-line @typescript-eslint/no-var-requires
const VERSION = pkg.version;
exports.VERSION = VERSION;
let _availableActions;
const availableActions = (templates, conflictStrategy = types_1.ConflictResolutionStrategy.FAIL) => {
    if (_availableActions)
        return _availableActions;
    const { generators } = (0, generators_1.loadGenerators)(templates, conflictStrategy);
    return generators.reduce((acc, generator) => {
        acc[generator.name] = generator.actions.map((a) => a.name);
        return acc;
    }, {});
};
exports.availableActions = availableActions;
const printHelp = (config, logger) => {
    logger.log(`Hygen v${VERSION}`);
    logger.log('\nAvailable actions:');
    const actionsByGenerator = availableActions(config.templates, config.conflictResolutionStrategy);
    // todo: this needs to be refactored
    // config-resolver is now throwing in certain cases
    if (!Object.keys(actionsByGenerator).length) {
        logger.log(`No generators or actions found.

      This means I didn't find a _templates folder right here,
      or anywhere up the folder tree starting here.

      Here's how to start using Hygen:

      $ hygen init self
      $ hygen with-prompt new --name my-generator

      (edit your generator in _templates/my-generator)

      $ hygen my-generator

      See https://hygen.io for more.

      `);
        return;
    }
    for (const [generator, actions] of Object.entries(actionsByGenerator)) {
        logger.log(`${(0, chalk_1.bold)(generator)}: ${actions.find((name) => name === params_1.DEFAULT_ACTION)
            ? `${generator}${actions.length > 1 ? ',' : ''} `
            : ''}${actions
            .filter((name) => name !== params_1.DEFAULT_ACTION)
            .map((action) => `${generator} ${action}`)
            .join(', ')}`);
    }
};
exports.printHelp = printHelp;

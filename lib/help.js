"use strict";

const fs = require('fs');

const path = require('path');

const chalk = require('chalk');

const pkg = require('../package.json');

const availableActions = templates => {
  const generators = fs.readdirSync(templates).filter(_ => fs.lstatSync(path.join(templates, _)).isDirectory());
  return generators.reduce((acc, generator) => {
    const actions = fs.readdirSync(path.join(templates, generator));
    acc[generator] = actions;
    return acc;
  }, {});
};

const printHelp = (templates, logger) => {
  logger.log(`Hygen v${pkg.version}`);
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

      See https://hygen.io for more.
      
      `);
    return;
  }

  Object.entries(availableActions(templates)).forEach(([k, v]) => {
    logger.log(`${chalk.bold(k)}: ${v.join(', ')}`);
  });
};

module.exports = {
  availableActions,
  printHelp
};
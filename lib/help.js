const fs = require('fs');

const L = require('lodash');

const path = require('path');

const chalk = require('chalk');

const help = templates => {
  const generators = L.filter(fs.readdirSync(templates), _ => fs.lstatSync(path.join(templates, _)).isDirectory());
  return L.reduce(generators, (acc, generator) => {
    const actions = fs.readdirSync(path.join(templates, generator));
    acc[generator] = actions;
    return acc;
  }, {});
};

const printHelp = (templates, logger) => {
  logger.log('\nAvailable actions:');
  L.each(help(templates), (v, k) => {
    logger.log(chalk.bold(k) + ': ' + v.join(', '));
  });
};

module.exports = {
  help,
  printHelp
};
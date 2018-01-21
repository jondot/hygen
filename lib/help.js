'use strict';

var fs = require('fs');

var L = require('lodash');
var path = require('path');
var chalk = require('chalk');
var help = function help(templates) {
  var generators = L.filter(fs.readdirSync(templates), function (_) {
    return fs.lstatSync(path.join(templates, _)).isDirectory();
  });
  return L.reduce(generators, function (acc, generator) {
    var actions = fs.readdirSync(path.join(templates, generator));
    acc[generator] = actions;
    return acc;
  }, {});
};

var printHelp = function printHelp(templates, logger) {
  logger.log('\nAvailable actions:');
  L.each(help(templates), function (v, k) {
    logger.log(chalk.bold(k) + ': ' + v.join(', '));
  });
};

module.exports = { help: help, printHelp: printHelp };
'use strict';

var engine = require('./engine');
var resolve = require('./templates-resolver');

var _require = require('./help'),
    printHelp = _require.printHelp;

var runner = function runner(defaultTemplates) {
  var cwd = process.cwd();
  var templates = resolve(cwd, defaultTemplates);
  try {
    engine(cwd, templates, console);
  } catch (err) {
    console.log(err.toString());
    printHelp(templates, console);
    process.exit(1);
  }
};

module.exports = {
  runner: runner,
  engine: engine,
  resolve: resolve,
  printHelp: printHelp
};
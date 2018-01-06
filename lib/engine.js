'use strict';

var fs = require('fs-extra');

var prompt = require('prompt-sync')({ sigint: true });
var render = require('./render');
var params = require('./params');
var execute = require('./execute');

var engine = function engine(cwd, templates, logger) {
  var externalArgv = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  var args = params(templates, externalArgv);
  var generator = args.generator,
      action = args.action,
      actionfolder = args.actionfolder;


  logger.log(args.dry ? '(dry mode)' : '');
  if (!generator) {
    throw new Error('please specify a generator.');
  }

  if (!action) {
    throw new Error('please specify an action for ' + generator + '.');
  }

  logger.log('Loaded templates: ' + templates.replace(cwd + '/', ''));
  if (!fs.existsSync(actionfolder)) {
    throw new Error('cannot find action \'' + action + '\' for generator \'' + generator + '\' (looked for ' + generator + '/' + action + ' in ' + templates + ').');
  }

  execute(cwd, render(args), prompt, args, { logger: logger });
};

module.exports = engine;
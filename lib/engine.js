"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const fs = require('fs-extra');

const params = require('./params');

const engine =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (argv, config) {
    const cwd = config.cwd,
          templates = config.templates,
          logger = config.logger;
    const args = Object.assign((yield params(config, argv)), {
      cwd
    });
    const generator = args.generator,
          action = args.action,
          actionfolder = args.actionfolder;
    logger.log(args.dry ? '(dry mode)' : '');

    if (!generator) {
      throw new Error('please specify a generator.');
    }

    if (!action) {
      throw new Error(`please specify an action for ${generator}.`);
    }

    logger.log(`Loaded templates: ${templates.replace(cwd + '/', '')}`);

    if (!(yield fs.exists(actionfolder))) {
      throw new Error(`I can't find action '${action}' for generator '${generator}'.

      You can try:
      1. 'hygen init self' to initialize your project, and
      2. 'hygen generator new --name ${generator}' to build the generator you wanted.

      Check out the quickstart for more: http://www.hygen.io/quick-start
      `);
    } // lazy loading these dependencies gives a better feel once
    // a user is exploring hygen (not specifying what to execute)


    const execute = require('./execute');

    const render = require('./render');

    return yield execute((yield render(args, config)), args, config);
  });

  return function engine(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = engine;
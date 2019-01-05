"use strict";

var _result = _interopRequireDefault(require("./result"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const path = require('path');

const fs = require('fs-extra');

const _require = require('chalk'),
      red = _require.red;

const add =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (action, args, {
    logger,
    cwd,
    createPrompter
  }) {
    const _action$attributes = action.attributes,
          to = _action$attributes.to,
          inject = _action$attributes.inject,
          unless_exists = _action$attributes.unless_exists;
    const result = (0, _result.default)('add', to);
    const prompter = createPrompter();

    if (!to || inject) {
      return result('ignored');
    }

    const absTo = path.resolve(cwd, to);
    const shouldNotOverwrite = unless_exists !== undefined && unless_exists === true;

    if (!process.env.HYGEN_OVERWRITE && (yield fs.exists(absTo))) {
      if (shouldNotOverwrite || !(yield prompter.prompt({
        prefix: '',
        type: 'confirm',
        name: 'overwrite',
        message: red(`     exists: ${to}. Overwrite? (y/N): `)
      }).then(({
        overwrite
      }) => overwrite))) {
        logger.warn(`     skipped: ${to}`);
        return result('skipped');
      }
    }

    if (!args.dry) {
      yield fs.ensureDir(path.dirname(absTo));
      yield fs.writeFile(absTo, action.body);
    }

    logger.ok(`       added: ${to}`);
    return result('added');
  });

  return function add(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = add;
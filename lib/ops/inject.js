"use strict";

var _result = _interopRequireDefault(require("./result"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const fs = require('fs-extra');

const path = require('path');

const injector = require('./injector');

const inject =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (action, args, {
    logger,
    cwd
  }) {
    const _action$attributes = action.attributes,
          to = _action$attributes.to,
          inject = _action$attributes.inject;
    const result = (0, _result.default)('inject', to);

    if (!(inject && to)) {
      return result('ignored');
    }

    const absTo = path.resolve(cwd, to);

    if (!(yield fs.exists(absTo))) {
      logger.err(`Cannot inject to ${to}: doesn't exist.`);
      return result('error', {
        error: `Cannot inject to ${to}: doesn't exist.`
      });
    }

    const content = (yield fs.readFile(absTo)).toString();
    const injectResult = injector(action, content);

    if (!args.dry) {
      yield fs.writeFile(absTo, injectResult);
    }

    logger.notice(`      inject: ${to}`);
    return result('inject');
  });

  return function inject(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = inject;
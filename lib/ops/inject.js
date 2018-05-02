function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

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

    if (!(inject && to)) {
      return;
    }

    const absTo = path.resolve(cwd, to);

    if (!(yield fs.exists(absTo))) {
      logger.err(`Cannot inject to ${to}: doesn't exist.`);
      return;
    }

    const content = (yield fs.readFile(absTo)).toString();
    const result = injector(action, content);

    if (!args.dry) {
      yield fs.writeFile(absTo, result);
    }

    logger.notice(`      inject: ${to}`);
  });

  return function inject(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = inject;
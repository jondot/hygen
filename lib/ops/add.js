function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

const inquirer = require('inquirer');

const path = require('path');

const fs = require('fs-extra');

const _require = require('chalk'),
      red = _require.red;

const add =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (action, args, {
    logger,
    cwd
  }) {
    const _action$attributes = action.attributes,
          to = _action$attributes.to,
          inject = _action$attributes.inject;

    if (!to || inject) {
      return;
    }

    const absTo = path.join(cwd, to);

    if (yield fs.exists(absTo)) {
      if (!(yield inquirer.prompt({
        prefix: '',
        type: 'confirm',
        name: 'overwrite',
        message: red(`     exists: ${to}. Overwrite? (y/N): `)
      }).then(({
        overwrite
      }) => overwrite))) {
        logger.warn(`     skipped: ${to}`);
        return;
      }
    }

    if (!args.dry) {
      yield fs.ensureDir(path.dirname(absTo));
      yield fs.writeFile(absTo, action.body);
    }

    logger.ok(`       added: ${to}`);
  });

  return function add(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = add;
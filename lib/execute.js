function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

const _require = require('chalk'),
      yellow = _require.yellow,
      red = _require.red,
      green = _require.green,
      magenta = _require.magenta;

const path = require('path');

const fs = require('fs-extra');

const L = require('lodash');

const inject = require('./inject');

const inquirer = require('inquirer');

const execute =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (renderedActions, args, config) {
    const logger = config.logger,
          cwd = config.cwd;
    const messages = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = renderedActions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        const action = _step.value;
        const relativeTo = action.attributes.to;
        const injectAction = action.attributes.inject;
        const to = path.join(cwd, relativeTo);

        if (!to) {
          logger.error(yellow(`WARN: skipping ${relativeTo}, no 'to' field provided in template.`));
          continue;
        }

        const message = action.attributes.message;

        if (message) {
          messages.push(message);
        }

        if (injectAction) {
          if (!(yield fs.exists(to))) {
            logger.error(red(`Cannot inject to ${to}: doesn't exist.`));
            continue;
          }

          if (!args.dry) {
            yield fs.writeFile(to, inject(action, (yield fs.readFile(to)).toString()).body);
          }

          logger.log(magenta(`      inject: ${relativeTo}`));
        } else {
          if (yield fs.exists(to)) {
            // readline-sync doesn't accept ^C, we'll need to replace it.
            if (!(yield inquirer.prompt({
              prefix: '',
              type: 'confirm',
              name: 'overwrite',
              message: red(`     exists: ${relativeTo}. Overwrite? (y/N): `)
            }).then(({
              overwrite
            }) => overwrite))) {
              logger.log(yellow(`     skipped: ${relativeTo}`));
              continue;
            }
          }

          if (!args.dry) {
            yield fs.ensureDir(path.dirname(to));
            yield fs.writeFile(to, action.body);
          }

          logger.log(green(`       added: ${relativeTo}`));
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    if (messages.length > 0) {
      logger.log(L.map(messages, m => `* ${m}`).join('\n'));
    }
  });

  return function execute(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = execute;
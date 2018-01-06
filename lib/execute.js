'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('chalk'),
    yellow = _require.yellow,
    red = _require.red,
    green = _require.green,
    magenta = _require.magenta;

var path = require('path');
var fs = require('fs-extra');
var L = require('lodash');
var inject = require('./inject');

var execute = function execute(cwd, renderedActions, prompt, args) {
  var opts = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  var logger = opts.logger;

  var messages = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)(renderedActions), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var action = _step.value;

      var relativeTo = action.attributes.to;
      var injectAction = action.attributes.inject;
      var to = path.join(cwd, relativeTo);

      if (!to) {
        logger.error(yellow('WARN: skipping ' + relativeTo + ', no \'to\' field provided in template.'));
        continue;
      }

      var message = action.attributes.message;

      if (message) {
        messages.push(message);
      }
      if (injectAction) {
        if (!fs.existsSync(to)) {
          logger.error(red('Cannot inject to ' + to + ': doesn\'t exist.'));
          continue;
        }

        if (!args.dry) {
          fs.writeFileSync(to, inject(action, fs.readFileSync(to).toString()).body);
        }
        logger.log(magenta('      inject: ' + relativeTo));
      } else {
        if (fs.existsSync(to)) {
          // readline-sync doesn't accept ^C, we'll need to replace it.
          if ((prompt(red('      exists: ' + relativeTo + '. Overwrite? (y/N): ')) || 'n').toLowerCase() !== 'y') {
            logger.log(yellow('     skipped: ' + relativeTo));
            continue;
          }
        }

        if (!args.dry) {
          fs.ensureDirSync(path.dirname(to));
          fs.writeFileSync(to, action.body);
        }
        logger.log(green('       added: ' + relativeTo));
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  if (messages.length > 0) {
    logger.log(L.map(messages, function (m) {
      return '* ' + m;
    }).join('\n'));
  }
};
module.exports = execute;
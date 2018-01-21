'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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
var inquirer = require('inquirer');

var execute = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(renderedActions, args, config) {
    var logger, cwd, messages, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, action, relativeTo, injectAction, to, message;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            logger = config.logger, cwd = config.cwd;
            messages = [];
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 5;
            _iterator = (0, _getIterator3.default)(renderedActions);

          case 7:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 54;
              break;
            }

            action = _step.value;
            relativeTo = action.attributes.to;
            injectAction = action.attributes.inject;
            to = path.join(cwd, relativeTo);

            if (to) {
              _context.next = 15;
              break;
            }

            logger.error(yellow('WARN: skipping ' + relativeTo + ', no \'to\' field provided in template.'));
            return _context.abrupt('continue', 51);

          case 15:
            message = action.attributes.message;

            if (message) {
              messages.push(message);
            }

            if (!injectAction) {
              _context.next = 37;
              break;
            }

            _context.next = 20;
            return fs.exists(to);

          case 20:
            if (_context.sent) {
              _context.next = 23;
              break;
            }

            logger.error(red('Cannot inject to ' + to + ': doesn\'t exist.'));
            return _context.abrupt('continue', 51);

          case 23:
            if (args.dry) {
              _context.next = 34;
              break;
            }

            _context.t0 = fs;
            _context.t1 = to;
            _context.t2 = inject;
            _context.t3 = action;
            _context.next = 30;
            return fs.readFile(to);

          case 30:
            _context.t4 = _context.sent.toString();
            _context.t5 = (0, _context.t2)(_context.t3, _context.t4).body;
            _context.next = 34;
            return _context.t0.writeFile.call(_context.t0, _context.t1, _context.t5);

          case 34:
            logger.log(magenta('      inject: ' + relativeTo));
            _context.next = 51;
            break;

          case 37:
            _context.next = 39;
            return fs.exists(to);

          case 39:
            if (!_context.sent) {
              _context.next = 45;
              break;
            }

            _context.next = 42;
            return inquirer.prompt({
              prefix: '',
              type: 'confirm',
              name: 'overwrite',
              message: red('     exists: ' + relativeTo + '. Overwrite? (y/N): ')
            }).then(function (_ref2) {
              var overwrite = _ref2.overwrite;
              return overwrite;
            });

          case 42:
            if (_context.sent) {
              _context.next = 45;
              break;
            }

            logger.log(yellow('     skipped: ' + relativeTo));
            return _context.abrupt('continue', 51);

          case 45:
            if (args.dry) {
              _context.next = 50;
              break;
            }

            _context.next = 48;
            return fs.ensureDir(path.dirname(to));

          case 48:
            _context.next = 50;
            return fs.writeFile(to, action.body);

          case 50:
            logger.log(green('       added: ' + relativeTo));

          case 51:
            _iteratorNormalCompletion = true;
            _context.next = 7;
            break;

          case 54:
            _context.next = 60;
            break;

          case 56:
            _context.prev = 56;
            _context.t6 = _context['catch'](5);
            _didIteratorError = true;
            _iteratorError = _context.t6;

          case 60:
            _context.prev = 60;
            _context.prev = 61;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 63:
            _context.prev = 63;

            if (!_didIteratorError) {
              _context.next = 66;
              break;
            }

            throw _iteratorError;

          case 66:
            return _context.finish(63);

          case 67:
            return _context.finish(60);

          case 68:
            if (messages.length > 0) {
              logger.log(L.map(messages, function (m) {
                return '* ' + m;
              }).join('\n'));
            }

          case 69:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[5, 56, 60, 68], [61,, 63, 67]]);
  }));

  return function execute(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
module.exports = execute;
'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var L = require('lodash');
var path = require('path');
var yargs = require('yargs-parser');
var prompt = require('./prompt');

var params = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(templates, externalArgv) {
    var argv, _argv$_, generator, action, _L$split, _L$split2, mainAction, subaction, actionfolder, promptArgs, args;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            argv = yargs(externalArgv);
            _argv$_ = (0, _slicedToArray3.default)(argv._, 2), generator = _argv$_[0], action = _argv$_[1];

            if (!(!generator || !action)) {
              _context.next = 4;
              break;
            }

            return _context.abrupt('return', { generator: generator, action: action, templates: templates });

          case 4:
            _L$split = L.split(action, ':'), _L$split2 = (0, _slicedToArray3.default)(_L$split, 2), mainAction = _L$split2[0], subaction = _L$split2[1];
            actionfolder = path.join(templates, generator, mainAction);
            _context.next = 8;
            return prompt(actionfolder);

          case 8:
            promptArgs = _context.sent;
            args = (0, _assign2.default)({
              templates: templates,
              actionfolder: actionfolder,
              generator: generator,
              action: action,
              subaction: subaction
            }, promptArgs, L.omit(argv, ['_']));
            return _context.abrupt('return', args);

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function params(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = params;
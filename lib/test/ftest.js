'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mock = require('mock-fs');

var ftest = function ftest(msg, files, test) {
  it(msg, (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            mock(files);
            _context.next = 4;
            return test();

          case 4:
            _context.prev = 4;

            mock.restore();
            return _context.finish(4);

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0,, 4, 7]]);
  })));
};

module.exports = ftest;
'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var engine = require('./engine');

var resolve = require('./templates-resolver');

var _require = require('./help'),
    printHelp = _require.printHelp;

var runner = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(argv, config) {
    var resolvedConfig, templates, logger;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            resolvedConfig = resolve(config);
            templates = resolvedConfig.templates, logger = resolvedConfig.logger;
            _context.prev = 2;
            _context.next = 5;
            return engine(argv, resolvedConfig);

          case 5:
            _context.next = 13;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context['catch'](2);

            logger.log(_context.t0.toString());
            if (config.debug) {
              logger.log('details -----------');
              logger.log(_context.t0.stack);
              logger.log('-------------------');
            }
            printHelp(templates, logger);
            process.exit(1);

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[2, 7]]);
  }));

  return function runner(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = {
  runner: runner,
  engine: engine,
  resolve: resolve,
  printHelp: printHelp
};
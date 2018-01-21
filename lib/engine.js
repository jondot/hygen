'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs-extra');

var params = require('./params');

var engine = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(argv, config) {
    var cwd, templates, logger, args, generator, action, actionfolder, execute, render;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            cwd = config.cwd, templates = config.templates, logger = config.logger;
            _context.next = 3;
            return params(templates, argv);

          case 3:
            args = _context.sent;
            generator = args.generator, action = args.action, actionfolder = args.actionfolder;


            logger.log(args.dry ? '(dry mode)' : '');

            if (generator) {
              _context.next = 8;
              break;
            }

            throw new Error('please specify a generator.');

          case 8:
            if (action) {
              _context.next = 10;
              break;
            }

            throw new Error('please specify an action for ' + generator + '.');

          case 10:

            logger.log('Loaded templates: ' + templates.replace(cwd + '/', ''));
            _context.next = 13;
            return fs.exists(actionfolder);

          case 13:
            if (_context.sent) {
              _context.next = 15;
              break;
            }

            throw new Error('cannot find action \'' + action + '\' for generator \'' + generator + '\' (looked for ' + generator + '/' + action + ' in ' + templates + ').');

          case 15:

            // lazy loading these dependencies gives a better feel once
            // a user is exploring hygen (not specifying what to execute)
            execute = require('./execute');
            render = require('./render');
            _context.t0 = execute;
            _context.next = 20;
            return render(args);

          case 20:
            _context.t1 = _context.sent;
            _context.t2 = args;
            _context.t3 = config;
            _context.next = 25;
            return (0, _context.t0)(_context.t1, _context.t2, _context.t3);

          case 25:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function engine(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = engine;
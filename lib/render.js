'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var L = require('lodash');

var fs = require('fs-extra');
var ejs = require('ejs');

var _require = require('lodash/fp'),
    map = _require.map,
    filter = _require.filter;

var fm = require('front-matter');
var path = require('path');
var context = require('./context');

var ignores = ['prompt.js'];
var renderTemplate = function renderTemplate(tmpl, locals) {
  return L.isString(tmpl) ? ejs.render(tmpl, context(locals)) : tmpl;
};

var render = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(args) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fs.readdir(args.actionfolder).then(map(function (_) {
              return path.join(args.actionfolder, _);
            })).then(filter(function (f) {
              return !L.find(ignores, function (ig) {
                return L.endsWith(f, ig);
              });
            })).then(map(function (file) {
              return fs.lstat(file).then(function (stat) {
                return { file: file, stat: stat };
              });
            })).then(function (_) {
              return _promise2.default.all(_);
            }).then(filter(function (_ref2) {
              var file = _ref2.file,
                  stat = _ref2.stat;
              return stat.isFile() && (args.subaction ? file.match(args.subaction) : true);
            })).then(map(function (_ref3) {
              var file = _ref3.file;
              return file;
            })).then(map(function (file) {
              return fs.readFile(file).then(function (text) {
                return { file: file, text: text.toString() };
              });
            })).then(function (_) {
              return _promise2.default.all(_);
            }).then(map(function (_ref4) {
              var file = _ref4.file,
                  text = _ref4.text;
              return (0, _assign2.default)({ file: file }, fm(text));
            })).then(map(function (_ref5) {
              var file = _ref5.file,
                  attributes = _ref5.attributes,
                  body = _ref5.body;
              return {
                file: file,
                attributes: L.mapValues(attributes, function (_) {
                  return renderTemplate(_, args);
                }),
                body: renderTemplate(body, args)
              };
            }));

          case 2:
            return _context.abrupt('return', _context.sent);

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function render(_x) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = render;
"use strict";

var _path = _interopRequireDefault(require("path"));

var _config = require("./config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const L = require('lodash');

const fs = require('fs-extra');

const configResolver = new _config.ConfigResolver('.hygen.js', {
  exists: fs.exists,
  // $FlowFixMe
  load: f => Promise.resolve(require(f)),
  none: f => ({})
});

module.exports =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (config) {
    const cwd = config.cwd,
          templates = config.templates;
    const resolvedTemplates = L.find([process.env.HYGEN_TMPLS, _path.default.join(cwd, '_templates')], _ => _ && fs.existsSync(_)) || templates;
    return _objectSpread({}, config, {
      templates: resolvedTemplates
    }, (yield configResolver.resolve(cwd)));
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();
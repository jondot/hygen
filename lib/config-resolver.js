"use strict";

var _config = require("./config");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

const L = require('lodash');

const fs = require('fs-extra');

const path = require('path');

const resolver = new _config.ConfigResolver('.hygen.js', {
  exists: fs.exists,
  // $FlowFixMe
  load: f => Promise.resolve(require(f))
});

module.exports =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (config) {
    const cwd = config.cwd,
          templates = config.templates;
    const fileConfig = yield resolver.resolve(cwd);
    const resolvedTemplates = L.find([process.env.HYGEN_TMPLS, path.join(cwd, '_templates')], _ => fs.existsSync(_)) || templates;
    return _extends({}, config, {
      templates: resolvedTemplates
    }, fileConfig);
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();
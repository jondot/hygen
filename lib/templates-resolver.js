'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _types = require('./types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var L = require('lodash');

var fs = require('fs-extra');
var path = require('path');
module.exports = function (config) {
  var cwd = config.cwd,
      templates = config.templates;

  var resolvedTemplates = L.find([path.join(cwd, process.env.HYGEN_TMPLS || '_templates'), path.join(cwd, '_templates')], function (_) {
    return fs.existsSync(_);
  }) || templates;
  return (0, _extends3.default)({}, config, { templates: resolvedTemplates });
};
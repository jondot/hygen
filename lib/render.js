'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var L = require('lodash');
var fs = require('fs-extra');
var ejs = require('ejs');

var _require = require('lodash/fp'),
    map = _require.map,
    filter = _require.filter;

var fm = require('front-matter');
var path = require('path');

var renderTemplate = function renderTemplate(tmpl, locals) {
  return ejs.render(tmpl, (0, _assign2.default)({}, locals, { h: helpers }));
};

var render = function render(args) {
  return L.flow(function (actionfolder) {
    return map(function (_) {
      return path.join(actionfolder, _);
    })(fs.readdirSync(actionfolder));
  }, filter(function (f) {
    return fs.lstatSync(f).isFile();
  }), map(function (file) {
    return { file: file, text: fs.readFileSync(file).toString() };
  }), map(function (_ref) {
    var file = _ref.file,
        text = _ref.text;
    return (0, _assign2.default)({ file: file }, fm(text));
  }), map(function (_ref2) {
    var file = _ref2.file,
        attributes = _ref2.attributes,
        body = _ref2.body;
    return {
      file: file,
      attributes: L.mapValues(attributes, function (_) {
        return renderTemplate(_, args);
      }),
      body: renderTemplate(body, args)
    };
  }));
};
var helpers = {
  capitalize: function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
};

module.exports = render;
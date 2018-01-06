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
var context = require('./context');

var renderTemplate = function renderTemplate(tmpl, locals) {
  return L.isString(tmpl) ? ejs.render(tmpl, context(locals)) : tmpl;
};

var render = function render(args) {
  return L.flow(function (_ref) {
    var actionfolder = _ref.actionfolder;
    return map(function (_) {
      return path.join(actionfolder, _);
    })(fs.readdirSync(actionfolder));
  }, filter(function (f) {
    return fs.lstatSync(f).isFile();
  }), filter(function (f) {
    return args.subaction ? f.match(args.subaction) : true;
  }), map(function (file) {
    return { file: file, text: fs.readFileSync(file).toString() };
  }), map(function (_ref2) {
    var file = _ref2.file,
        text = _ref2.text;
    return (0, _assign2.default)({ file: file }, fm(text));
  }), map(function (_ref3) {
    var file = _ref3.file,
        attributes = _ref3.attributes,
        body = _ref3.body;
    return {
      file: file,
      attributes: L.mapValues(attributes, function (_) {
        return renderTemplate(_, args);
      }),
      body: renderTemplate(body, args)
    };
  }))(args);
};
module.exports = render;
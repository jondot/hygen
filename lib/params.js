'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var L = require('lodash');
var path = require('path');
var yargs = require('yargs-parser');

var params = function params(templates, externalArgv) {
  var argv = yargs(externalArgv || process.argv.slice(2));

  var _argv$_ = (0, _slicedToArray3.default)(argv._, 2),
      generator = _argv$_[0],
      action = _argv$_[1];

  if (!generator || !action) {
    return { generator: generator, action: action, templates: templates };
  }

  var _L$split = L.split(action, ':'),
      _L$split2 = (0, _slicedToArray3.default)(_L$split, 2),
      mainAction = _L$split2[0],
      subaction = _L$split2[1];

  var actionfolder = path.join(templates, generator, mainAction);
  var args = (0, _assign2.default)({
    templates: templates,
    actionfolder: actionfolder,
    generator: generator,
    action: action,
    subaction: subaction
  }, L.omit(argv, ['_']));

  return args;
};

module.exports = params;
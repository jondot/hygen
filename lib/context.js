'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var L = require('lodash');

var helpers = {
  capitalize: function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
};

var localsToCapitalize = ['name'];
var localsDefaults = {
  name: 'unnamed'
};
var capitalizedLocals = function capitalizedLocals(locals) {
  return L.mapValues(L.mapKeys(L.pick(locals, localsToCapitalize), function (v, k) {
    return helpers.capitalize(k);
  }), function (v) {
    return helpers.capitalize(v);
  });
};

var context = function context(locals) {
  var localsWithDefaults = (0, _assign2.default)({}, localsDefaults, locals);
  return (0, _assign2.default)(localsWithDefaults, capitalizedLocals(localsWithDefaults), {
    h: helpers
  });
};
module.exports = context;
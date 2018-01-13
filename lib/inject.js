'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var L = require('lodash');

var before = function before(_, lines) {
  return L.findIndex(lines, function (l) {
    return l.match(_);
  });
};
var locations = {
  at_line: function at_line(_) {
    return _;
  },
  prepend: function prepend(_) {
    return 1;
  },
  append: function append(_, lines) {
    return lines.length - 1;
  },
  before: before,
  after: function after(_, lines) {
    return before(_, lines) + 1;
  }
};
var indexByLocation = function indexByLocation(attributes, lines) {
  var pair = L.find(L.toPairs(attributes), function (_ref) {
    var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
        k = _ref2[0],
        v = _ref2[1];

    return locations[k];
  });
  if (pair) {
    var _pair = (0, _slicedToArray3.default)(pair, 2),
        k = _pair[0],
        v = _pair[1];

    return locations[k](v, lines);
  }
  return -1;
};
var inject = function inject(action, intoText) {
  var attributes = action.attributes,
      body = action.body;

  var lines = intoText.split('\n');
  var shouldSkip = attributes.skip_if && !!L.find(lines, function (_) {
    return _.match(attributes.skip_if);
  });

  if (!shouldSkip) {
    var idx = indexByLocation(attributes, lines);
    if (idx >= 0) {
      lines.splice(idx, 0, body);
    }
  }
  var injected = lines.join('\n');
  return (0, _extends3.default)({}, action, { body: injected });
};

module.exports = inject;
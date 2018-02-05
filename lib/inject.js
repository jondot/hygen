function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return _sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }

const L = require('lodash');

const before = (_, lines) => L.findIndex(lines, l => l.match(_));

const locations = {
  at_line: _ => _,
  prepend: _ => 1,
  append: (_, lines) => lines.length - 1,
  before,
  after: (_, lines) => before(_, lines) + 1
};

const indexByLocation = (attributes, lines) => {
  const pair = L.find(L.toPairs(attributes), ([k, v]) => locations[k]);

  if (pair) {
    const _pair = _slicedToArray(pair, 2),
          k = _pair[0],
          v = _pair[1];

    return locations[k](v, lines);
  }

  return -1;
};

const inject = (action, intoText) => {
  const attributes = action.attributes,
        body = action.body;
  const lines = intoText.split('\n');
  const shouldSkip = attributes.skip_if && !!L.find(lines, _ => _.match(attributes.skip_if));

  if (!shouldSkip) {
    const idx = indexByLocation(attributes, lines);

    if (idx >= 0) {
      lines.splice(idx, 0, body);
    }
  }

  const injected = lines.join('\n');
  return _extends({}, action, {
    body: injected
  });
};

module.exports = inject;
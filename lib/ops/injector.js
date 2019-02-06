"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

const L = require('lodash');

const injector = (action, content) => {
  const _action$attributes = action.attributes,
        skip_if = _action$attributes.skip_if,
        eof_last = _action$attributes.eof_last,
        attributes = action.attributes,
        body = action.body;
  const lines = content.split('\n'); //eslint-disable-next-line

  const shouldSkip = skip_if && !!content.match(skip_if);

  if (!shouldSkip) {
    const idx = indexByLocation(attributes, lines); //eslint-disable-next-line

    const trimEOF = idx >= 0 && eof_last === false && /\r?\n$/.test(body); //eslint-disable-next-line

    const insertEOF = idx >= 0 && eof_last === true && !/\r?\n$/.test(body);

    if (trimEOF) {
      lines.splice(idx, 0, body.replace(/\r?\n$/, ''));
    } else if (insertEOF) {
      lines.splice(idx, 0, `${body}\n`);
    } else if (idx >= 0) {
      lines.splice(idx, 0, body);
    }
  }

  return lines.join('\n');
};

const getPragmaticIndex = (pattern, lines, isBefore) => {
  const oneLineMatchIndex = L.findIndex(lines, l => l.match(pattern));

  if (oneLineMatchIndex < 0) {
    const fullText = lines.join('\n');
    const fullMatch = fullText.match(new RegExp(pattern, "m"));

    if (fullMatch && fullMatch.length) {
      if (isBefore) {
        const fullTextUntilMatchStart = fullText.substring(0, fullMatch.index);
        return fullTextUntilMatchStart.split('\n').length - 1;
      } else {
        const matchEndIndex = fullMatch.index + fullMatch.toString().length;
        const fullTextUntilMatchEnd = fullText.substring(0, matchEndIndex);
        return fullTextUntilMatchEnd.split('\n').length;
      }
    }
  }

  return oneLineMatchIndex + (isBefore ? 0 : 1);
};

const locations = {
  at_line: _ => _,
  prepend: _ => 0,
  append: (_, lines) => lines.length - 1,
  before: (_, lines) => getPragmaticIndex(_, lines, true),
  after: (_, lines) => getPragmaticIndex(_, lines, false)
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

module.exports = injector;
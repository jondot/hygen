"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var newline_1 = __importDefault(require("../newline"));
var EOLRegex = /\r?\n/;
var getPragmaticIndex = function (pattern, lines, isBefore) {
    var oneLineMatchIndex = lines.findIndex(function (l) { return l.match(pattern); });
    // joins the text and looks for line number,
    // we dont care about platform line-endings correctness other than joining/splitting
    // for all platforms
    if (oneLineMatchIndex < 0) {
        var fullText = lines.join('\n');
        var fullMatch = fullText.match(new RegExp(pattern, 'm'));
        if (fullMatch && fullMatch.length) {
            if (isBefore) {
                var fullTextUntilMatchStart = fullText.substring(0, fullMatch.index);
                return fullTextUntilMatchStart.split(EOLRegex).length - 1;
            }
            var matchEndIndex = fullMatch.index + fullMatch.toString().length;
            var fullTextUntilMatchEnd = fullText.substring(0, matchEndIndex);
            return fullTextUntilMatchEnd.split(EOLRegex).length;
        }
    }
    return oneLineMatchIndex + (isBefore ? 0 : 1);
};
var locations = {
    at_line: function (_) { return _; },
    prepend: function (_) { return 0; },
    append: function (_, lines) { return lines.length - 1; },
    before: function (_, lines) { return getPragmaticIndex(_, lines, true); },
    after: function (_, lines) { return getPragmaticIndex(_, lines, false); },
};
var indexByLocation = function (attributes, lines) {
    var pair = Object.entries(attributes).find(function (_a) {
        var k = _a[0], _ = _a[1];
        return locations[k];
    });
    if (pair) {
        var k = pair[0], v = pair[1];
        return locations[k](v, lines);
    }
    return -1;
};
var injector = function (action, content) {
    var _a = action.attributes, skip_if = _a.skip_if, eof_last = _a.eof_last, attributes = action.attributes, body = action.body;
    var shouldSkip = skip_if && !!content.match(skip_if);
    if (!shouldSkip) {
        //
        // we care about producing platform-correct line endings.
        // however the "correct" line endings should be detected from the actual
        // CONTENT given, and not the underlying operating system.
        // this is similar to how a text editor behaves.
        //
        var NL = (0, newline_1.default)(content);
        var lines = content.split(NL);
        // returns -1 (end) if no attrs
        var idx = indexByLocation(attributes, lines);
        var trimEOF = idx >= 0 && eof_last === false && /\r?\n$/.test(body);
        var insertEOF = idx >= 0 && eof_last === true && !/\r?\n$/.test(body);
        if (trimEOF) {
            lines.splice(idx, 0, body.replace(/\r?\n$/, ''));
        }
        else if (insertEOF) {
            lines.splice(idx, 0, "".concat(body).concat(NL));
        }
        else if (idx >= 0) {
            lines.splice(idx, 0, body);
        }
        return lines.join(NL);
    }
    else {
        return content;
    }
};
exports.default = injector;

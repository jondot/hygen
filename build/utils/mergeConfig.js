"use strict";
// import { HygenConfig } from '../hygen'
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Merge 2 objects according to these rules.
//   1. Any key in fresh, not in stale is added to final
//   2. if fresh value is array,
// @param {object} stale object which is being changed
// @param {object} fresh object to be merged
// @return {object} result of merge rules on stale and fresh
exports.mergeConfig = function (stale, fresh, deeper) {
    if (deeper === void 0) { deeper = true; }
    return Object.entries(fresh).reduce(function (final, _a) {
        var key = _a[0], value = _a[1];
        if (!final[key]) {
            /* when the fresh key does not exist in stale */
            final[key] = value;
        }
        else if (Array.isArray(value) && Array.isArray(final[key])) {
            /* when both values are arrays */
            final[key] = __spreadArrays(final[key], fresh[key]);
        }
        else if (typeof value === 'function') {
            /* when fresh is a function */
            final[key] = value(final[key]);
        }
        else if (deeper &&
            typeof value === 'object' &&
            typeof final[key] === 'object') {
            /* when both values are objects */
            final[key] = exports.mergeConfig(final[key], value, false);
        }
        else {
            /* in every other case */
            final[key] = value;
        }
        // console.log('mergeConfig', final)
        if (final.logger && deeper) {
            var c = {
                stale: Object.keys(stale).length,
                fresh: Object.keys(fresh).length,
                final: Object.keys(final).length,
            };
            final.logger.trace('mergeConfig(stale, fresh, deeper = true) ===', final);
            final.logger.debug("  results: stale: " + c.stale + ", fresh: " + c.fresh + ", final: " + c.final + " ");
        }
        return final;
    }, __assign({}, stale));
};
exports.default = exports.mergeConfig;

"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var PathTo = /** @class */ (function () {
    function PathTo() {
        var basePath = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            basePath[_i] = arguments[_i];
        }
        this.basePath = basePath;
    }
    Object.defineProperty(PathTo.prototype, "currentPath", {
        // @ts-ignore
        get: function () {
            var _a;
            return (_a = PathTo.pathUtil).join.apply(_a, this.basePath);
        },
        enumerable: true,
        configurable: true
    });
    PathTo.prototype.add = function () {
        var paths = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            paths[_i] = arguments[_i];
        }
        return new (PathTo.bind.apply(PathTo, __spreadArrays([void 0], this.basePath, paths)))();
    };
    PathTo.prototype.path = function () {
        var _a;
        var paths = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            paths[_i] = arguments[_i];
        }
        return (_a = PathTo.pathUtil).join.apply(_a, __spreadArrays(this.basePath, paths));
    };
    return PathTo;
}());
module.exports = {
    PathTo: PathTo,
};

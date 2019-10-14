"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var cc = require('change-case');
var inflection = require('inflection');
var suffixer = {
    get: function (target, prop) {
        if (target.hasOwnProperty(prop))
            return target[prop];
        if (prop[0] === prop[0].toLowerCase()) {
            return "" + target.name + cc.pascal(prop);
        }
        else if (prop === prop.toUpperCase()) {
            return target.NAME + "_" + prop;
        }
        else {
            return "" + target.Name + cc.pascal(prop);
        }
    },
};
exports.nameMaker = function (_a) {
    var name = _a.name, args = __rest(_a, ["name"]);
    var baseData = {
        name: inflection.singularize(cc.camel(name)),
        Name: inflection.singularize(cc.pascal(name)),
        names: inflection.pluralize(cc.camel(name)),
        Names: inflection.pluralize(cc.pascal(name)),
        NAME: cc.constant(inflection.singularize(cc.pascal(name))),
        NAMES: cc.constant(inflection.pluralize(cc.camel(name))),
    };
    Object.assign(args, baseData);
    return new Proxy(baseData, suffixer);
};

"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_ACTION = void 0;
var path_1 = __importDefault(require("path"));
var yargs_parser_1 = __importDefault(require("yargs-parser"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var prompt_1 = __importDefault(require("./prompt"));
exports.DEFAULT_ACTION = '_default';
var resolvePositionals = function (templates, args) { return __awaiter(void 0, void 0, void 0, function () {
    var generator, action, name, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                generator = args[0], action = args[1], name = args[2];
                _a = generator &&
                    action;
                if (!_a) return [3 /*break*/, 2];
                return [4 /*yield*/, fs_extra_1.default.exists(path_1.default.join(templates, generator, action))];
            case 1:
                _a = (_c.sent());
                _c.label = 2;
            case 2:
                if (_a) {
                    return [2 /*return*/, [generator, action, name]];
                }
                _b = generator;
                if (!_b) return [3 /*break*/, 4];
                return [4 /*yield*/, fs_extra_1.default.exists(path_1.default.join(templates, generator, exports.DEFAULT_ACTION))];
            case 3:
                _b = (_c.sent());
                _c.label = 4;
            case 4:
                if (_b) {
                    action = exports.DEFAULT_ACTION;
                    generator = args[0], name = args[1];
                }
                return [2 /*return*/, [generator, action, name]];
        }
    });
}); };
var params = function (_a, externalArgv_1) { return __awaiter(void 0, [_a, externalArgv_1], void 0, function (_b, externalArgv) {
    var argv, extra_argv, _c, generator, action, name, _d, mainAction, subaction, actionfolder, _, cleanArgv, promptArgs, args;
    var templates = _b.templates, createPrompter = _b.createPrompter;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                argv = (0, yargs_parser_1.default)(externalArgv);
                extra_argv = argv._;
                return [4 /*yield*/, resolvePositionals(templates, extra_argv)];
            case 1:
                _c = _e.sent(), generator = _c[0], action = _c[1], name = _c[2];
                if (!generator || !action) {
                    return [2 /*return*/, { generator: generator, action: action, templates: templates }];
                }
                _d = action.split(':'), mainAction = _d[0], subaction = _d[1];
                actionfolder = path_1.default.join(templates, generator, mainAction);
                _ = argv._, cleanArgv = __rest(argv, ["_"]);
                return [4 /*yield*/, (0, prompt_1.default)(createPrompter, actionfolder, __assign(__assign({}, (name ? { name: name } : {})), cleanArgv))];
            case 2:
                promptArgs = _e.sent();
                args = Object.assign({
                    templates: templates,
                    actionfolder: actionfolder,
                    generator: generator,
                    action: action,
                    subaction: subaction,
                }, 
                // include positionals as special arg for templates to consume,
                // and a unique timestamp for this run
                { _: _, ts: process.env.HYGEN_TS || new Date().getTime() }, cleanArgv, name && { name: name }, promptArgs);
                return [2 /*return*/, args];
        }
    });
}); };
exports.default = params;

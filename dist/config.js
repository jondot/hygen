"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reversePathsToWalk = exports.ConfigResolver = exports.configLookup = void 0;
var path_1 = __importDefault(require("path"));
// inline fp methods due to perf
var uniq = function (arr) { return arr.filter(function (elem, pos, a) { return a.indexOf(elem) === pos; }); };
var reversePathsToWalk = function (_a) {
    var folder = _a.folder, path = _a.path;
    var resolved = path.resolve(folder);
    var parts = resolved.split(path.sep);
    var results = parts.map(function (_, idx, arr) {
        return arr.slice(0, idx + 1).join(path.sep);
    });
    results[0] = results[0] || '/';
    return results.reverse();
};
exports.reversePathsToWalk = reversePathsToWalk;
var configLookup = function (file, folder, path) {
    if (path === void 0) { path = path_1.default; }
    return uniq(reversePathsToWalk({ folder: folder, path: path }).map(function (p) { return path.join(p, file); }));
};
exports.configLookup = configLookup;
var ConfigResolver = /** @class */ (function () {
    function ConfigResolver(configFile, io) {
        this.configFile = configFile;
        this.io = io;
    }
    ConfigResolver.prototype.resolve = function (from) {
        return __awaiter(this, void 0, void 0, function () {
            var configCandidates, _a, exists, load, none, _i, configCandidates_1, candidate;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        configCandidates = configLookup(this.configFile, from);
                        _a = this.io, exists = _a.exists, load = _a.load, none = _a.none;
                        _i = 0, configCandidates_1 = configCandidates;
                        _b.label = 1;
                    case 1:
                        if (!(_i < configCandidates_1.length)) return [3 /*break*/, 4];
                        candidate = configCandidates_1[_i];
                        return [4 /*yield*/, exists(candidate)];
                    case 2:
                        if (_b.sent()) {
                            return [2 /*return*/, load(candidate)];
                        }
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, none(from)];
                }
            });
        });
    };
    return ConfigResolver;
}());
exports.ConfigResolver = ConfigResolver;

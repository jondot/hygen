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
var path_1 = __importDefault(require("path"));
var debug_1 = __importDefault(require("debug"));
var degit_1 = __importDefault(require("degit"));
var result_1 = __importDefault(require("./result"));
var debug = (0, debug_1.default)('hygen:ops:setup');
/*
XXX:
- Name -> target directory
- setup -> rename to 'from'?
-  --setup|from argument overrides setup
-  --mode argument
-  --verbose, --cache
XXX:
- testing infra: when focus added ignore snapshots
- better ignoring when focusing?
- better separation to individual tests?, rework test generation

*/
var notEmpty = function (x) { return x && x.length > 0; };
var setup = function (_a, args_1, _b) { return __awaiter(void 0, [_a, args_1, _b], void 0, function (_c, args, _d) {
    var result, to, payload, d, error_1;
    var _e = _c.attributes, setup = _e.setup, mode = _e.mode, verbose = _e.verbose, force = _e.force;
    var logger = _d.logger, cwd = _d.cwd;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                result = (0, result_1.default)('setup', setup);
                if (!notEmpty(setup)) return [3 /*break*/, 7];
                if (!setup.includes('/')) {
                    throw new Error("'".concat(setup, "' must be a repo"));
                }
                to = args.to || '.';
                payload = {
                    setup: setup,
                    mode: mode || 'tar',
                    verbose: !!verbose,
                    force: !!args.force || !!force,
                    to: path_1.default.resolve(cwd, to),
                };
                if (!!args.dry) return [3 /*break*/, 5];
                _f.label = 1;
            case 1:
                _f.trys.push([1, 3, , 4]);
                debug('exec %o %o', setup, payload);
                d = (0, degit_1.default)(setup, {
                    mode: payload.mode,
                    force: payload.force,
                    verbose: payload.verbose,
                });
                return [4 /*yield*/, d.clone(payload.to)];
            case 2:
                _f.sent();
                debug('done');
                logger.ok("       setup: ".concat(setup, " -> ").concat(to));
                return [3 /*break*/, 4];
            case 3:
                error_1 = _f.sent();
                debug('error %o', error_1);
                logger.err("       setup: ".concat(setup, " ").concat(error_1));
                return [3 /*break*/, 4];
            case 4: return [3 /*break*/, 6];
            case 5:
                logger.ok("       setup: ".concat(setup, " -> ").concat(to));
                _f.label = 6;
            case 6: return [2 /*return*/, result('executed', payload)];
            case 7: return [2 /*return*/, result('ignored')];
        }
    });
}); };
exports.default = setup;

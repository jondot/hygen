"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.reversePathsToWalk = exports.ConfigResolver = exports.configLookup = void 0;
const nodePath = __importStar(require("path"));
// inline fp methods due to perf
const uniq = (arr) => arr.filter((elem, pos, a) => a.indexOf(elem) === pos);
const reversePathsToWalk = ({ folder, path }) => {
    const resolved = path.resolve(folder);
    const parts = resolved.split(path.sep);
    const results = parts.map((_, idx, arr) => arr.slice(0, idx + 1).join(path.sep));
    results[0] = results[0] || '/';
    return results.reverse();
};
exports.reversePathsToWalk = reversePathsToWalk;
const configLookup = (file, folder, path = nodePath) => uniq(reversePathsToWalk({ folder, path }).map((p) => path.join(p, file)));
exports.configLookup = configLookup;
class ConfigResolver {
    constructor(configFile, io) {
        this.configFile = configFile;
        this.io = io;
    }
    resolve(from) {
        return __awaiter(this, void 0, void 0, function* () {
            const configCandidates = configLookup(this.configFile, from);
            const { exists, load, none } = this.io;
            for (const candidate of configCandidates) {
                if (yield exists(candidate)) {
                    this.loadedConfigPath = candidate;
                    return load(candidate);
                }
            }
            return none(from);
        });
    }
}
exports.ConfigResolver = ConfigResolver;

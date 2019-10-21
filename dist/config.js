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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
// inline fp methods due to perf
const uniq = arr => arr.filter((elem, pos, a) => a.indexOf(elem) === pos);
const reversePathsToWalk = ({ folder, path }) => {
    const resolved = path.resolve(folder);
    const parts = resolved.split(path.sep);
    const results = parts.map((_, idx, arr) => arr.slice(0, idx + 1).join(path.sep));
    results[0] = results[0] || '/';
    return results.reverse();
};
exports.reversePathsToWalk = reversePathsToWalk;
const configLookup = (file, folder, path = path_1.default) => uniq(reversePathsToWalk({ folder, path }).map(p => path.join(p, file)));
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
                    return load(candidate);
                }
            }
            return none(from);
        });
    }
}
exports.ConfigResolver = ConfigResolver;
//# sourceMappingURL=config.js.map
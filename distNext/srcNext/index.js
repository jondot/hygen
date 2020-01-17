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
Object.defineProperty(exports, "__esModule", { value: true });
const resolvers_1 = require("./resolvers");
const resolveInit = resolvers_1.resolveArray('inits');
const resolvers = [
    resolvers_1.resolveEnv,
    resolvers_1.resolveIo,
    resolvers_1.resolveTools,
    resolvers_1.resolveHelpers,
    resolvers_1.resolveConfig,
    resolveInit,
    resolvers_1.resolveYargs,
    resolvers_1.resolveGenerator,
];
exports.runner = (initial) => __awaiter(void 0, void 0, void 0, function* () {
    return resolvers.reduce((main, resolver) => main.then(resolver).then(mod => {
        console.log(mod.args);
        return mod;
    }), Promise.resolve(initial));
});
//# sourceMappingURL=index.js.map
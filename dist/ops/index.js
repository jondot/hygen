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
const resolve = (attributes) => __awaiter(void 0, void 0, void 0, function* () {
    const ops = [];
    if (attributes.to && !attributes.inject) {
        const add = (yield Promise.resolve().then(() => __importStar(require('./add')))).default;
        ops.push(add);
    }
    if (attributes.to && attributes.inject) {
        const inject = (yield Promise.resolve().then(() => __importStar(require('./inject')))).default;
        ops.push(inject);
    }
    if (attributes.echo) {
        const echo = (yield Promise.resolve().then(() => __importStar(require('./echo')))).default;
        ops.push(echo);
    }
    if (attributes.sh) {
        const shell = (yield Promise.resolve().then(() => __importStar(require('./shell')))).default;
        ops.push(shell);
    }
    if (attributes.setup) {
        const setup = (yield Promise.resolve().then(() => __importStar(require('./setup')))).default;
        ops.push(setup);
    }
    return ops;
});
exports.default = resolve;

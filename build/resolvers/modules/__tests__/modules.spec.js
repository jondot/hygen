"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var modules_1 = __importDefault(require("./src/v5/resolvers/modules"));
describe('modulesResolver(hygenConfig)', function () {
    it('should be a function', function () {
        expect(typeof modules_1.default).toEqual('function');
    });
});

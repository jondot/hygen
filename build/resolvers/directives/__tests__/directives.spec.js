"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var directives_1 = __importDefault(require("/home/scottp/code/workspace/hygen/src/v5/resolvers/directives"));
describe('directivesResolver(hygenConfig)', function () {
    it('should be a function', function () {
        expect(typeof directives_1.default).toEqual('function');
    });
});

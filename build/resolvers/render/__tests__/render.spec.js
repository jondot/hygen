"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var render_1 = __importDefault(require("/home/scottp/code/workspace/hygen/src/v5/resolvers/render"));
describe('renderResolver(hygenConfig)', function () {
    it('should be a function', function () {
        expect(typeof render_1.default).toEqual('function');
    });
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var hooks_1 = __importDefault(require("../hooks"));
describe('hooksResolver', function () {
    describe('Basics', function () {
        it('should be a function', function () {
            expect(typeof hooks_1.default).toEqual('function');
        });
        // does it accept all of the various parameter signatures it needs
        // does it return the correct data
    });
    describe('hooksResolver(config: HygenConfig): HygenConfig', function () {
        // happy path
        it('should test happy path', function () {
            var hasRealTests = false;
            expect(hasRealTests).toBeTruthy();
        });
    });
    describe('Errors', function () {
        it('should test errors by causing them', function () {
            var hasRealTests = false;
            expect(hasRealTests).toBeTruthy();
        });
    });
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = __importDefault(require("../helpers"));
describe('helpersResolver', function () {
    describe('Basics', function () {
        it('should be a function', function () {
            expect(typeof helpers_1.default).toEqual('function');
        });
        // does it accept all of the various parameter signatures it needs
        // does it return the correct data
    });
    describe('helpersResolver(config: HygenConfig): HygenConfig', function () {
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

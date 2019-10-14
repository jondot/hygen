"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mergeConfig_1 = __importDefault(require("../mergeConfig"));
describe('mergeHygenConfig', function () {
    describe('Basics', function () {
        it('should be a function', function () {
            expect(typeof mergeConfig_1.default).toEqual('function');
        });
        // does it accept all of the various parameter signatures it needs
        // does it return the correct data
    });
    describe('mergeHygenConfig(stale: HygenConfig, fresh: HygenConfig): HygenConfig', function () {
        it('should merge two object', function () {
            var stale = { a: 1 };
            var fresh = { b: 2 };
            var result = mergeConfig_1.default(stale, fresh);
            expect(result).toEqual({ a: 1, b: 2 });
        });
        it('should replace fresh scalar values', function () {
            // let stale = { a: 42, b: 'bob', c: false, stale: true }
            // let fresh = { a: 'Carrot', b: false, c: 'p', fresh: true }
            var stale = { a: 42, b: 'Vimes', c: false, d: new Date() };
            var fresh = {
                a: 'Carrot',
                b: true,
                c: new Set([42, 42, 42]),
                d: 'Ironfounderson',
            };
            var result = mergeConfig_1.default(stale, fresh);
            expect(result).toEqual(fresh);
        });
        it('should append fresh arrays to stale', function () {
            var stale = { a: [], b: [42], c: ['Vimes'] };
            var fresh = { a: ['King'], b: [], c: ['Carrot'] };
            var result = mergeConfig_1.default(stale, fresh);
            expect(result).toEqual({ a: ['King'], b: [42], c: ['Vimes', 'Carrot'] });
        });
        it('should run a fresh function on old data and use result', function () {
            var stale = { a: 42 };
            var fresh = { a: function (orig) { return orig / 14; } };
            var result = mergeConfig_1.default(stale, fresh);
            expect(result).toEqual({ a: 3 });
        });
        it('should also merge the second generation of object values', function () {
            var stale = { a: { b: 17, c: 1, e: [1, 1, 2] } };
            var fresh = { a: { b: 52, d: 17, e: [3, 5, 8] } };
            var result = mergeConfig_1.default(stale, fresh);
            expect(result).toEqual({
                a: { b: 52, c: 1, d: 17, e: [1, 1, 2, 3, 5, 8] },
            });
        });
        it('should send a trace and debug message', function () {
            var stale = {
                logger: {
                    trace: jest.fn(function (msg) { return msg; }),
                    debug: jest.fn(function (msg) { return msg; }),
                },
            };
            var fresh = {
                carrot: 'Captain',
            };
            var result = mergeConfig_1.default(stale, fresh);
            expect(stale.logger.trace.mock.calls.length).toEqual(1);
            expect(stale.logger.debug.mock.calls.length).toEqual(1);
        });
    });
    xdescribe('Errors', function () {
        it('should test errors by causing them', function () {
            var hasRealTests = false;
            expect(hasRealTests).toBeTruthy();
        });
    });
});

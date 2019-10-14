"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nameMaker_1 = require("../nameMaker");
describe("nameMaker({name: 'wooticusPrime'})", function () {
    it('should be a function', function () {
        expect(typeof nameMaker_1.nameMaker).toEqual('function');
    });
    it('should return an object with 6 properties', function () {
        var result = nameMaker_1.nameMaker({ name: 'wooticusPrime' });
        expect(typeof result).toEqual('object');
        expect(result.name).toBe('wooticusPrime');
        expect(result.Name).toBe('WooticusPrime');
        expect(result.names).toBe('wooticusPrimes');
        expect(result.Names).toBe('WooticusPrimes');
        expect(result.NAME).toBe('WOOTICUS_PRIME');
        expect(result.NAMES).toBe('WOOTICUS_PRIMES');
    });
    describe('new Proxy(nameMaker({wooticusPrime}, suffixer)', function () {
        it('should return a name matching prop used', function () {
            var result = nameMaker_1.nameMaker({ name: 'wooticusPrime' });
            expect(result.shape).toBe('wooticusPrimeShape');
            expect(result.Shape).toBe('WooticusPrimeShape');
            expect(result.SHAPE).toBe('WOOTICUS_PRIME_SHAPE');
        });
    });
});

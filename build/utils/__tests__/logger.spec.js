"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = __importDefault(require("../logger"));
describe('new Logger(log,argv,mappings)', function () {
    var myLogger = function (msg) { msg; };
    it('should take a log function', function () {
        var logger = new logger_1.default(myLogger);
        var result = logger.log('woot');
        expect(result).toEqual('woot');
    });
    it('should have multiple logTypes', function () {
        var logger = new logger_1.default(myLogger);
        expect(logger).toHaveProperty('debug');
        expect(logger).toHaveProperty('err');
        expect(logger).toHaveProperty('error');
        expect(logger).toHaveProperty('info');
        expect(logger).toHaveProperty('ok');
        expect(logger).toHaveProperty('silent');
        expect(logger).toHaveProperty('verbose');
        expect(logger).toHaveProperty('warn');
    });
    describe('logLevels', function () {
        it('should set a default logLevel', function () {
            var logger = new logger_1.default(myLogger);
            expect(logger.logLevel).toEqual(2);
        });
        it('should set appropriate levels based on argv', function () {
            var logger = new logger_1.default(myLogger);
            expect(logger.logLevelFrom({ logLevel: 42 })).toEqual(42);
            expect(logger.logLevelFrom({ s: true })).toEqual(5);
            expect(logger.logLevelFrom({ silent: true })).toEqual(5);
            expect(logger.logLevelFrom({ q: true })).toEqual(4);
            expect(logger.logLevelFrom({ quiet: true })).toEqual(4);
            expect(logger.logLevelFrom({ warn: true })).toEqual(3);
            expect(logger.logLevelFrom({})).toEqual(2);
            expect(logger.logLevelFrom({ debug: true })).toEqual(1);
            expect(logger.logLevelFrom({ trace: true })).toEqual(0);
        });
        describe('should set appropriate levels based on process.env', function () {
            describe('DEBUG', function () {
                var origEnvDEBUG = process.env.DEBUG;
                afterEach(function () { return (process.env.DEBUG = origEnvDEBUG); });
                it('should set debug for DEBUG=true', function () {
                    var logger = new logger_1.default(myLogger);
                    var initialResult = logger.logLevel;
                    process.env.DEBUG = true;
                    logger.setLevelFrom({});
                    var envResult = logger.logLevel;
                    expect(initialResult).toEqual(2);
                    expect(envResult).toEqual(1);
                });
            });
        });
    });
    it('should not send messages below logLevel', function () {
        var logger = new logger_1.default(myLogger, { q: true });
        var resultAbove = logger.error('above');
        var resultBelow = logger.trace('below');
        expect(resultAbove).toMatch('above');
        expect(resultBelow).toBeNull();
    });
    it('should add run formatter to messages', function () {
        var logger = new logger_1.default(myLogger);
        var result = logger.ok('woot');
        expect(result).toMatch('woot');
    });
    it('should allow custom mappings', function () {
        var myMapping = { woot: function (msg) { return msg.toUpperCase(); } };
        var logger = new logger_1.default(myLogger, {}, myMapping);
        var result = logger.woot('prime');
        expect(result).toEqual('PRIME');
    });
});

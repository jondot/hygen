"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var walkers_1 = require("../walkers");
var path_1 = __importDefault(require("path"));
describe("walkDirUp(from, to = '/')", function () {
    it('should be a function', function () {
        expect(typeof walkers_1.walkDirUp).toEqual('function');
    });
    it('should return an array of path', function () {
        var dir = '/home/rincewind/code/project';
        var result = walkers_1.walkDirUp({ startAt: dir });
        expect(Array.isArray(result)).toBeTruthy();
    });
    it('should return only the startAt path if stopAt is false', function () {
        var dir = '/home/rincewind/code/project';
        var result = walkers_1.walkDirUp({ startAt: dir });
        expect(result);
    });
    it('should return only the startAt path if stopAt is startAt', function () {
        var dir = '/home/rincewind/code/project';
        var result = walkers_1.walkDirUp({ startAt: dir, stopAt: dir });
        expect(result.length).toEqual(1);
        expect(result).toEqual([dir]);
    });
    describe("for process.platform !== 'win32'", function () {
        it('should return every path from itself to root', function () {
            var dir = '/home/rincewind/code/project';
            var result = walkers_1.walkDirUp({ startAt: dir });
            expect(result.length).toEqual(5);
            expect(result[1]).toEqual('/home/rincewind/code');
        });
        it('should not include paths that start with stopAt', function () {
            var projectDir = '/home/rincewind/code/project';
            var dir = projectDir + '/_templates/generator/action';
            var result = walkers_1.walkDirUp({ startAt: dir, stopAt: projectDir });
            expect(result.length).toEqual(4);
            expect(result[2]).toEqual('/home/rincewind/code/project/_templates');
        });
        it('should add a filename if withFile is passed', function () {
            var dir = '/home/rincewind/code/project';
            var result = walkers_1.walkDirUp({
                startAt: dir,
                stopAt: dir,
                withFile: '.hygen.js',
            });
            expect(result.length).toEqual(1);
            expect(result[0]).toEqual('/home/rincewind/code/project/.hygen.js');
        });
    });
    describe('process.platform = win32', function () {
        it('looks up windows folders', function () {
            var result = walkers_1.walkDirUp({
                withFile: '.myconfig',
                startAt: 'C:\\foo\\bar\\baz',
                path: path_1.default.win32,
            });
            expect(Array.isArray(result)).toBeTruthy();
            expect(result.length).toEqual(4);
            expect(result[1]).toEqual('C:\\foo\\bar\\.myconfig');
            expect(result[2]).toEqual('C:\\foo\\.myconfig');
        });
    });
});

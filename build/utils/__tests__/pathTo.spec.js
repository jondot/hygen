"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
// import {PathTo} from 'utils/pathTo'
var pathTo = require('utils/pathTo');
describe('pathTo', function () {
    it('should be a function', function () {
        expect(typeof pathTo).toEqual('function');
    });
    it('should be a class', function () {
        var instance = new pathTo('/tmp');
        expect(instance).toBeInstanceOf(pathTo);
    });
    describe('new pathTo(...basePaths)', function () {
        var base, paths, obj;
        beforeEach(function () {
            base = '/some/place';
            paths = ['where', 'it', 'is', 'warm'];
            obj = new pathTo(base);
        });
        describe('currentPath', function () {
            it('should default to base', function () {
                expect(obj.currentPath).toEqual(base);
            });
            it('  even with multiple paths in base', function () {
                var arrBase = ['/', 'some', 'place'];
                var arrObj = new (pathTo.bind.apply(pathTo, __spreadArrays([void 0], arrBase)))();
                expect(arrObj.currentPath).toEqual('/some/place');
            });
        });
        describe('add(...paths)', function () {
            it('should return a new pathTo instance', function () {
                var objWithPaths = obj.add.apply(obj, paths);
                expect(objWithPaths).toBeInstanceOf(pathTo);
                expect(objWithPaths).not.toEqual(obj);
            });
            it('should have combined base and paths', function () {
                var objWithPaths = obj.add.apply(obj, paths);
                expect(objWithPaths.base[0]).toEqual(base);
                expect(objWithPaths.base.slice(1)).toEqual(paths);
            });
        });
        describe('path(...parts)', function () {
            it('should return a string path', function () {
                var result = obj.path('away', 'from', 'here');
                expect(result).toEqual('/some/place/away/from/here');
            });
            it('should not change the origin obj', function () {
                var origBase = obj.base;
                var result = obj.path('awesome');
                expect(obj.base).toEqual(obj.base);
            });
        });
    });
    describe('original tests', function () {
        it('should have properties (...basePath)', function () {
            var result = new pathTo('a', 'b');
            expect(result.base).toEqual(expect.arrayContaining(['a', 'b']));
            expect(result.currentPath).toBe('a/b');
        });
        it('should add paths', function () {
            var result = new pathTo('a', 'b').add('c');
            expect(result.base).toEqual(expect.arrayContaining(['a', 'b', 'c']));
            expect(result.currentPath).toBe('a/b/c');
        });
        it('should return path', function () {
            var result = new pathTo('a', 'b').add('c');
            expect(result.path('d', 'e')).toBe('a/b/c/d/e');
        });
        it('should return current path if called empty', function () {
            var result = new pathTo('a', 'b');
            expect(result.path()).toBe('a/b');
        });
    });
});

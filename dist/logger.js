"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
// chalk 4.1.2 doesn't type template property
var yellow = chalk_1.default.yellow, red = chalk_1.default.red, green = chalk_1.default.green, magenta = chalk_1.default.magenta, template = chalk_1.default.template;
var Logger = /** @class */ (function () {
    function Logger(log) {
        this.log = log;
    }
    Logger.prototype.colorful = function (msg) {
        this.log(template(chalk_1.default, msg));
    };
    Logger.prototype.notice = function (msg) {
        this.log(magenta(msg));
    };
    Logger.prototype.warn = function (msg) {
        this.log(yellow(msg));
    };
    Logger.prototype.err = function (msg) {
        this.log(red(msg));
    };
    Logger.prototype.ok = function (msg) {
        this.log(green(msg));
    };
    return Logger;
}());
exports.default = Logger;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
// chalk 4.1.2 doesn't type template property
const { yellow, red, green, magenta, template } = chalk_1.default;
class Logger {
    constructor(log) {
        this.log = log;
    }
    colorful(msg) {
        this.log(template(chalk_1.default, msg));
    }
    notice(msg) {
        this.log(magenta(msg));
    }
    warn(msg) {
        this.log(yellow(msg));
    }
    err(msg) {
        this.log(red(msg));
    }
    ok(msg) {
        this.log(green(msg));
    }
}
exports.default = Logger;

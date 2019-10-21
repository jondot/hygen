"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resolve = attributes => {
    const ops = [];
    if (attributes.to && !attributes.inject) {
        const add = require('./add').default;
        ops.push(add);
    }
    if (attributes.to && attributes.inject) {
        const inject = require('./inject').default;
        ops.push(inject);
    }
    if (attributes.sh) {
        const shell = require('./shell').default;
        ops.push(shell);
    }
    return ops;
};
exports.default = resolve;
//# sourceMappingURL=index.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noopRenderer = () => false;
exports.allRenderers = Object.freeze({
    to: exports.noopRenderer,
    inject: exports.noopRenderer,
    shell: exports.noopRenderer,
    message: exports.noopRenderer,
});
//# sourceMappingURL=index.js.map
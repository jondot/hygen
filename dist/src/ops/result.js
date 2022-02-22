"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (type, subject, start = new Date()) => (status, payload = null, end = new Date()) => (Object.assign({ type,
    subject,
    status, timing: end.getTime() - start.getTime() }, (payload && { payload })));
//# sourceMappingURL=result.js.map
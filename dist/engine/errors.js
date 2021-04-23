"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActionNotFoundError = exports.getNoActionError = exports.getNoGeneratorError = exports.ShowHelpError = void 0;
class ShowHelpError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, ShowHelpError.prototype);
    }
}
exports.ShowHelpError = ShowHelpError;
exports.getNoGeneratorError = () => {
    return new ShowHelpError('please specify a generator.');
};
exports.getNoActionError = () => {
    return new ShowHelpError('please specify a generator.');
};
exports.getActionNotFoundError = (generator, action) => {
    return new ShowHelpError(`I can't find action '${action}' for generator '${generator}'.

  You can try:
  1. 'hygen init self' to initialize your project, and
  2. 'hygen generator new --name ${generator}' to build the generator you wanted.

  Check out the quickstart for more: http://www.hygen.io/quick-start
  `);
};
//# sourceMappingURL=errors.js.map
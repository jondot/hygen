"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNoGeneratorsFoundMessage = exports.getActionNotFoundError = exports.getNoActionError = exports.getNoGeneratorError = exports.ShowHelpError = void 0;
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
exports.getNoGeneratorsFoundMessage = () => `No generators or actions found. 

      This means I didn't find a _templates folder right here, 
      or anywhere up the folder tree starting here.

      Here's how to start using Hygen:

      $ hygen init self
      $ hygen with-prompt new --name my-generator

      (edit your generator in _templates/my-generator)

      $ hygen my-generator 

      See http://hygen.io for more.
      
      `;
//# sourceMappingURL=errors.js.map
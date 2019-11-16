"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const inflect = __importStar(require("inflection"));
const changeCase = __importStar(require("change-case"));
exports.resolveHelpers = config => {
    config.helpers = Object.assign({ capitalize: inflect.capitalize, inflect,
        changeCase }, (config.helpers || {}));
    return Promise.resolve(config);
};
//# sourceMappingURL=helpers.js.map
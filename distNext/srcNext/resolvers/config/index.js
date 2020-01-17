"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configFiles_1 = require("./configFiles");
const generators_1 = require("./generators");
const common_1 = require("../common");
exports.resolveConfig = (config) => Promise.all([
    generators_1.fetchGenerators(config),
    configFiles_1.fetchConfigFiles(config),
])
    .catch(err => {
    // console.error('resolveConfig', err)
    throw new Error(err);
})
    .then((resultsArr) => {
    // @ts-ignore
    const [generator, mods] = resultsArr;
    config.generator = generator;
    return Promise.resolve(mods.reduce((config, mod) => common_1.mergeConfig(config, mod), config));
});
//# sourceMappingURL=index.js.map
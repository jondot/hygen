"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configResolver = (config) => {
    Promise.resolve(config)
        .then(resolveEnv);
    // .then(resolveIo)
    // .then(resolveTools)
    // .then(resolveHelpers)
    // .then(config => Promise.all([
    //   resolveGeneratorSummary(config),
    //   resoloveHygenConfig(config),
    // ]))
    // .then()
    // build tools config
    // find template files, config files
    return Promise.all([
        fetchGenerators(config),
        fetchUser(config),
    ])
        .catch(err => {
        console.error(err);
        throw new Error(err);
    })
        .then((resultsArr) => {
        // @ts-ignore
        const [generator, userConfig] = resultsArr;
        console.log('configResolver', generator.summary.gen);
        // config.generator = summary
        config.modules = userConfig;
        config.generator = generator;
        return config;
    }).then(() => config);
};
//# sourceMappingURL=config.js.map
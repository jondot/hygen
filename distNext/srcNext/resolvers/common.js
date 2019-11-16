"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noopResolver = (config) => Promise.resolve(config);
const mergeObjectKeys = ['env', 'io', 'tools', 'helpers', 'generator'];
const addArrayKeys = ['init', 'prompt', 'param', 'yarg'];
const mergeArrayKeys = ['inits', 'prompts', 'params', 'yargs'];
exports.mergeConfig = (config, mod) => {
    // console.log(mod)
    mergeObjectKeys.forEach(section => {
        if (!(mod[section]))
            return;
        config[section] = Object.assign(Object.assign({}, config[section]), mod[section]);
    });
    mergeArrayKeys.forEach(section => {
        // console.log('mergeArray',section, mod[section],config[section])
        if (!mod[section])
            return;
        if (!config[section])
            config[section] = [];
        if (Array.isArray(mod[section])) {
            config[section].push(...mod[section]);
            return config;
        }
        config[section].push(mod[section]);
    });
    addArrayKeys.forEach(section => {
        // console.log('addArray',section, mod[section],config[section])
        if (!mod[section])
            return;
        if (Array.isArray(mod[section])) {
            config[section + 's'].push(...mod[section]);
            return config;
        }
        config[section + 's'].push(mod[section]);
    });
    return config;
};
exports.resolveCustomYargs = (arr) => yargs => arr.reduce((y, custom) => custom(y), yargs);
exports.resolveArray = (field) => {
    return (config) => {
        const arr = config[field];
        if (!(arr && Array.isArray(arr)))
            return Promise.resolve(config);
        return arr.reduce((main, resolver) => main.then(resolver), Promise.resolve(config));
    };
};
//# sourceMappingURL=common.js.map
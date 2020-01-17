"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchConfigFiles = (config) => {
    const { io, env, tools } = config;
    return Promise.resolve(tools.reversePathsToWalk({
        files: env.configFile,
        from: env.cwd,
        path: io.path,
    }))
        .catch(err => {
        throw new Error(err);
    })
        .then((files) => Promise.all(files.map((file) => io.exists(file).then((flag) => flag ? file : ''))).then((files) => files.filter(f => f.length > 0)))
        .then((files) => Promise.all(files.map((file) => {
        tools.logger.notice(`Loading ${file}`);
        return io.load(file)
            .catch(err => {
            tools.logger.err(`Config file loading Error: ${file}`);
            throw err;
        });
    })));
};
//# sourceMappingURL=configFiles.js.map
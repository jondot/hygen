"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pathTo_1 = require("../utils/pathTo");
var assignPathToHelpers = function (config) {
    pathTo_1.PathTo.pathUtil = config.tools.io.path;
    config.helpers.pathTo = pathTo_1.PathTo(config.env.cwd);
    config.helpers.pathTo.pathUtil(config.env.path);
    config.helpers.projectPath = config.helpers.pathTo;
    config.helpers.srcPath = config.helpers.pathTo.add('src');
    config.helpers.testPath = config.helpers.srcPath.add('__tests__');
    config.helpers.templatesPath = config.helpers.projectPath.add(config.env.templatedDir);
    return Promise.resolve(config);
};
var pathToModule = {
    hooks: {
        postModule: [assignPathToHelpers],
    },
};
exports.default = pathToModule;

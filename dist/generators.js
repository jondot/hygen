"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadGenerators = exports.actionKeyFor = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const types_1 = require("./types");
const actionKeyFor = (generator, action) => `${generator}::${action}`;
exports.actionKeyFor = actionKeyFor;
let generators = null;
const actionsMap = new Map();
function mapActions(generator, conflictStrategy) {
    for (const action of generator.actions) {
        const key = (0, exports.actionKeyFor)(generator.name, action.name);
        if (actionsMap.has(key)) {
            switch (conflictStrategy) {
                case types_1.ConflictResolutionStrategy.FAIL:
                    throw new Error(`
Action conflict: "${key}" defined by ${generator.path} was already
defined by ${actionsMap.get(action.name).path}.

You are seeing this error because the 'conflictResolutionMode' is set to 'fail'.
Update that value in your hygen config to

- "override" if you want to keep the action is defined last
- "skip" to keep the action that appears first
        `);
                case types_1.ConflictResolutionStrategy.SKIP:
                    continue;
                case types_1.ConflictResolutionStrategy.OVERRIDE:
                    actionsMap.set(key, generator);
            }
        }
    }
}
const loadGeneratorsForTemplate = (templatesFolder) => {
    const generators = (0, fs_1.readdirSync)(templatesFolder.path).filter((_) => (0, fs_1.lstatSync)((0, path_1.join)(templatesFolder.path, _)).isDirectory());
    return generators.reduce((acc, name) => {
        const path = (0, path_1.join)(templatesFolder.path, name);
        const actions = (0, fs_1.readdirSync)(path);
        acc.push({
            name,
            path,
            actions,
        });
        return acc;
    }, []);
};
function loadGenerators(templates, conflictStrategy) {
    if (generators)
        return { generators, actionsMap };
    for (const templateFolder of templates) {
        generators = loadGeneratorsForTemplate(templateFolder);
        for (const generator of generators) {
            mapActions(generator, conflictStrategy);
        }
    }
    return {
        generators,
        actionsMap,
    };
}
exports.loadGenerators = loadGenerators;

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_extra_1 = __importDefault(require("fs-extra"));
const config_1 = require("./config");
const configResolver = new config_1.ConfigResolver('.hygen.js', {
    exists: fs_extra_1.default.exists,
    load: (f) => __awaiter(void 0, void 0, void 0, function* () { return yield Promise.resolve().then(() => __importStar(require(f))); }),
    none: (_) => ({}),
});
/**
 * Normalizes a {@link RunnerConfig.templates} option into an array of TemplateConfig
 * with ALL properties defined
 *
 * @param templates the value of the `templates` option from user configuration
 * @returns {TemplateConfigObj[]} a flat array of {@link TemplateConfigObj} objects
 */
const normalizeTemplatesConfig = (templates) => {
    if (!templates)
        return [];
    if (typeof templates === 'string')
        return [{ path: templates, prefix: '' }];
    if (Array.isArray(templates)) {
        return templates.map((tpl, index) => {
            if (typeof tpl == 'string') {
                return { path: tpl, prefix: '' };
            }
            if (typeof (tpl === null || tpl === void 0 ? void 0 : tpl.path) === 'string') {
                return Object.assign({ prefix: '' }, tpl);
            }
            throw new Error(`Invalid configuration found in 'templates' option item ${index + 1}
    Each template configured in templates should either be a string with a filesystem path
    or an object with a 'path' string property and optionally a 'prefix'.

    The templates[${index}] (item ${index + 1}) is ${JSON.stringify(templates[index], null, 4)}
      `);
        });
    }
    throw new Error(`Invalid value for the 'config' parameter of the normalizeTemplatesConfig function.
    It should be a string or an Array of strings|TemplateConfig
    but we got: ${JSON.stringify(templates, null, 4)} `);
};
/**
 * Finds the last object passing {@link rule} in the {@link objs} array
 * @param rule The name of the property
 * @param objs And array of objects with the {@link rule}
 * @returns
 */
function findLast(objs, rule) {
    return [...objs].reverse().find((obj) => rule(obj));
}
/**
 * Validates that all paths in the config exist
 *
 * @remarks instead of assuming that missing directory means "no intention"
 * throw error when templatesOverride is set but does not exist
 */
const resolveConfigSourcesTemplates = (cwd, configs) => {
    const seen = new Map();
    let hasValidPaths = false;
    const missingPaths = [];
    // The order in which the folders appear will be relevant later
    // when listing all generators and deciding their precedence
    // So let's reverse the order to make it easier to keep the last
    // appearance of a path
    const resolvedConfigs = [...configs]
        .reverse()
        .reduce((final, configSource) => {
        const tplConfig = normalizeTemplatesConfig(configSource.config.templates);
        const resolvedPaths = tplConfig
            .reverse()
            .map((tplConfig) => {
            var _a;
            const resolvedPath = Object.assign(Object.assign({}, tplConfig), { exists: ((_a = seen.has[tplConfig.path]) === null || _a === void 0 ? void 0 : _a.exists) || fs_extra_1.default.existsSync(tplConfig.path), overridden: seen.has(tplConfig.path), pathChecked: true });
            if (resolvedPath.exists) {
                hasValidPaths = true;
            }
            else {
                missingPaths.push(resolvedPath);
            }
            seen[tplConfig.path] = resolvedPath;
            return resolvedPath;
        });
        final.push(Object.assign(Object.assign({}, configSource), { templates: resolvedPaths }));
        return final;
    }, []);
    return {
        resolvedConfigSources: resolvedConfigs,
        hasValidPaths,
        missingPaths,
    };
};
/**
 * Resolves the `templates` config with the following precedence order:
 *
 * 1. Picking the last `templatesOverride` of {@link configs}
 * 2. Checking the HYGEN_TMPLS env variable
 * 3. Merging the `templates` config option from all configs and deduping the paths
 *
 * @param cwd Current working directory
 * @param configs An array of {@link ConfigSource}s
 * @returns The resolved `templates` config option
 */
const resolveTemplates = (cwd, configs) => {
    // 1. templateOverrides takes precedence over all
    const overridingConfig = findLast(configs, (c) => Boolean(c.config.templatesOverride));
    if (overridingConfig) {
        const normalizedConfig = normalizeTemplatesConfig(overridingConfig.config.templatesOverride);
        // instead of assuming that missing directory means "no intention"
        // throw error when templatesOverride is set but does not exist
        const missingPaths = normalizedConfig.filter((t) => t.path && !fs_extra_1.default.existsSync(t.path));
        if (missingPaths.length) {
            throw new Error(`
        Invalid templatesOverride config in ${overridingConfig.source}.
          The following paths are missing:${missingPaths.map((p) => `
            - ${p.path}`)}
        `);
        }
        return normalizedConfig.map((config) => (Object.assign(Object.assign({}, config), { pathChecked: true, exists: true, overridden: false })));
    }
    // env should take precedence over the configs
    // this almost avoids a breaking change, but we should also throw if the value is invalid
    if (process.env.HYGEN_TMPLS) {
        const resolvedPath = (0, path_1.resolve)(process.env.HYGEN_TMPLS);
        if (!fs_extra_1.default.existsSync(resolvedPath)) {
            throw new Error(`Invalid HYGEN_TMPLS value: could not find ${overridingConfig} (resolved to: ${resolvedPath})`);
        }
        return [
            {
                path: resolvedPath,
                prefix: '',
                pathChecked: true,
                exists: true,
                overridden: false,
            },
        ];
    }
    // Append a config for the local directory
    configs.push({
        config: {
            templates: (0, path_1.resolve)(cwd, '_templates'),
        },
        source: 'hygen default config',
    });
    const { resolvedConfigSources, hasValidPaths, missingPaths } = resolveConfigSourcesTemplates(cwd, configs);
    // if (missingPaths.length) {
    //   // todo: core team should decide if they want to show a warning
    //   // saying that the paths in `missingPaths` are missing or not
    //   console.log(`The following paths from your 'templates' config option are missing: ${missingPaths
    //     .map((t) => `      - ${t.path}`)
    //     .join('\n')},
    //   }`)
    // }
    if (!hasValidPaths) {
        throw new Error(`We tried and tried but could not find a templates folder. Here's where we've look:

        1. a .hygen.js 'templatesOverride' config option (not present)
        2. HYGEN_TMPLS is not set
        3. The following paths from the 'templates' config option (all missing) ${missingPaths
            .map((t) => `      - ${t.path}`)
            .join('\n')}
        4. in the current folder (${cwd}) from a '_templates' folder
      `);
    }
    return resolvedConfigSources
        .flatMap((cfgSource) => cfgSource.templates)
        .filter((p) => p.exists && !p.overridden);
};
exports.default = (config) => __awaiter(void 0, void 0, void 0, function* () {
    const { cwd } = config;
    const fileConfig = yield configResolver.resolve(cwd);
    const resolvedTemplates = resolveTemplates(cwd, [
        { config, source: 'default config' },
        { config: fileConfig, source: configResolver.loadedConfigPath || '' },
    ]);
    return Object.assign(Object.assign(Object.assign({}, config), fileConfig), { templates: resolvedTemplates });
});

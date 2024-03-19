import { resolve as pathResolve } from 'path'
import fs from 'fs-extra'
import type {
  ResolvedRunnerConfig,
  ResolvedTemplatePathConfig,
  RunnerConfig,
  TemplateConfigObj,
} from './types'
import { ConfigResolver } from './config'

const configResolver = new ConfigResolver('.hygen.js', {
  exists: fs.exists,
  load: async (f) => await import(f),
  none: (_) => ({}),
})

/**
 * Normalizes a {@link RunnerConfig.templates} option into an array of TemplateConfig
 * with ALL properties defined
 *
 * @param templates the value of the `templates` option from user configuration
 * @returns {TemplateConfigObj[]} a flat array of {@link TemplateConfigObj} objects
 */
const normalizeTemplatesConfig = (
  templates?: RunnerConfig['templates'],
): TemplateConfigObj[] => {
  if (!templates) return []

  if (typeof templates === 'string') return [{ path: templates, prefix: '' }]

  if (Array.isArray(templates)) {
    return templates.map((tpl: string | TemplateConfigObj, index: number) => {
      if (typeof tpl == 'string') {
        return { path: tpl, prefix: '' }
      }

      if (typeof tpl?.path === 'string') {
        return {
          prefix: '',
          ...tpl,
        }
      }

      throw new Error(`Invalid configuration found in 'templates' option item ${
        index + 1
      }
    Each template configured in templates should either be a string with a filesystem path
    or an object with a 'path' string property and optionally a 'prefix'.

    The templates[${index}] (item ${index + 1}) is ${JSON.stringify(
        templates[index],
        null,
        4,
      )}
      `)
    })
  }

  throw new Error(`Invalid value for the 'config' parameter of the normalizeTemplatesConfig function.
    It should be a string or an Array of strings|TemplateConfig
    but we got: ${JSON.stringify(templates, null, 4)} `)
}

interface ConfigSource {
  config: RunnerConfig
  source: string
}

interface ResolvedConfigSource extends ConfigSource {
  templates: ResolvedTemplatePathConfig[]
}

/**
 * Finds the last object passing {@link rule} in the {@link objs} array
 * @param rule The name of the property
 * @param objs And array of objects with the {@link rule}
 * @returns
 */
function findLast<TObject>(
  objs: TObject[],
  rule: (current: TObject) => boolean,
): TObject {
  return [...objs].reverse().find((obj) => rule(obj))
}

/**
 * Validates that all paths in the config exist
 *
 * @remarks instead of assuming that missing directory means "no intention"
 * throw error when templatesOverride is set but does not exist
 */
const resolveConfigSourcesTemplates = (
  cwd: string,
  configs: ConfigSource[],
): {
  resolvedConfigSources: ResolvedConfigSource[]
  hasValidPaths: boolean
  missingPaths: ResolvedTemplatePathConfig[]
} => {
  const seen: Map<string, { exists: boolean }> = new Map<
    string,
    { exists: boolean }
  >()
  let hasValidPaths = false
  const missingPaths: ResolvedTemplatePathConfig[] = []

  // The order in which the folders appear will be relevant later
  // when listing all generators and deciding their precedence
  // So let's reverse the order to make it easier to keep the last
  // appearance of a path
  const resolvedConfigs = [...configs]
    .reverse()
    .reduce((final: ResolvedConfigSource[], configSource: ConfigSource) => {
      const tplConfig = normalizeTemplatesConfig(configSource.config.templates)

      const resolvedPaths: ResolvedTemplatePathConfig[] = tplConfig
        .reverse()
        .map<ResolvedTemplatePathConfig>((tplConfig) => {
          const resolvedPath: ResolvedTemplatePathConfig = {
            ...tplConfig,
            exists:
              seen.has[tplConfig.path]?.exists || fs.existsSync(tplConfig.path),
            overridden: seen.has(tplConfig.path),
            pathChecked: true,
          }

          if (resolvedPath.exists) {
            hasValidPaths = true
          } else {
            missingPaths.push(resolvedPath)
          }

          seen[tplConfig.path] = resolvedPath

          return resolvedPath
        })

      final.push({
        ...configSource,
        templates: resolvedPaths,
      })

      return final
    }, [])

  return {
    resolvedConfigSources: resolvedConfigs,
    hasValidPaths,
    missingPaths,
  }
}

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
const resolveTemplates = (
  cwd: string,
  configs: ConfigSource[],
): ResolvedTemplatePathConfig[] => {
  // 1. templateOverrides takes precedence over all
  const overridingConfig = findLast(configs, (c) =>
    Boolean(c.config.templatesOverride),
  )

  if (overridingConfig) {
    const normalizedConfig = normalizeTemplatesConfig(
      overridingConfig.config.templatesOverride,
    )

    // instead of assuming that missing directory means "no intention"
    // throw error when templatesOverride is set but does not exist
    const missingPaths = normalizedConfig.filter(
      (t) => t.path && !fs.existsSync(t.path),
    )

    if (missingPaths.length) {
      throw new Error(`
        Invalid templatesOverride config in ${overridingConfig.source}.
          The following paths are missing:${missingPaths.map(
            (p) => `
            - ${p.path}`,
          )}
        `)
    }

    return normalizedConfig.map((config) => ({
      ...config,
      pathChecked: true,
      exists: true,
      overridden: false,
    }))
  }

  // env should take precedence over the configs
  // this almost avoids a breaking change, but we should also throw if the value is invalid
  if (process.env.HYGEN_TMPLS) {
    const resolvedPath = pathResolve(process.env.HYGEN_TMPLS)

    if (!fs.existsSync(resolvedPath)) {
      throw new Error(
        `Invalid HYGEN_TMPLS value: could not find ${overridingConfig} (resolved to: ${resolvedPath})`,
      )
    }

    return [
      {
        path: resolvedPath,
        prefix: '',
        pathChecked: true,
        exists: true,
        overridden: false,
      },
    ]
  }

  // Append a config for the local directory
  configs.push({
    config: {
      templates: pathResolve(cwd, '_templates'),
    },
    source: 'hygen default config',
  })

  const { resolvedConfigSources, hasValidPaths, missingPaths } =
    resolveConfigSourcesTemplates(cwd, configs)

  // if (missingPaths.length) {
  //   // todo: core team should decide if they want to show a warning
  //   // saying that the paths in `missingPaths` are missing or not
  //   console.log(`The following paths from your 'templates' config option are missing: ${missingPaths
  //     .map((t) => `      - ${t.path}`)
  //     .join('\n')},
  //   }`)
  // }

  if (!hasValidPaths) {
    throw new Error(
      `We tried and tried but could not find a templates folder. Here's where we've look:

        1. a .hygen.js 'templatesOverride' config option (not present)
        2. HYGEN_TMPLS is not set
        3. The following paths from the 'templates' config option (all missing) ${missingPaths
          .map((t) => `      - ${t.path}`)
          .join('\n')}
        4. in the current folder (${cwd}) from a '_templates' folder
      `,
    )
  }

  return resolvedConfigSources
    .flatMap((cfgSource) => cfgSource.templates)
    .filter((p) => p.exists && !p.overridden)
}

export default async (config: RunnerConfig): Promise<ResolvedRunnerConfig> => {
  const { cwd } = config
  const fileConfig: RunnerConfig = await configResolver.resolve(cwd)

  const resolvedTemplates = resolveTemplates(cwd, [
    { config, source: 'default config' },
    { config: fileConfig, source: configResolver.loadedConfigPath || '' },
  ])

  return {
    ...config,
    ...fileConfig,
    templates: resolvedTemplates,
  }
}

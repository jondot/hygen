import type { ActionResult } from 'src/types'

const wrapper = (name, plugin) => {
  const result = createResult(`plugin:${name}`, plugin)
  return async (action, args, config): ActionResult => {
    const { attributes } = action
    const { logger } = config
    const attribute = attributes[name]
    if (!args.dry) {
      // eslint-disable-next-line no-param-reassign
      args[name] = await plugin(attribute, action, args, config)
      logger.ok(`       ${name}: ${args[name]}`)
      return result('executed', args[name])
    } else {
      return result('ignored')
    }
  }
}

const resolvePlugins = (dataArr, config, args) => {
  if (!(config && config.plugins)) return dataArr
  if (typeof config.plugins !== 'object')
    console.log('INVALID PLUGINS') || process.exit(1)
  return dataArr.map(data => {
    data.pluginResults = data.pluginResults || {}

    Object.entries(config.plugins).forEach(async ([name, plugin]) => {
      if (!(name in data.attributes)) return

      const attribute = data.attributes[name]

      data.pluginResults[name] = await plugin(attribute, data, config, args)
    })
    return data
  })
}
module.exports = resolvePlugins

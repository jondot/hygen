const path = require('path')
const cwd = process.cwd()
module.exports = {
  params: config => {
    console.log(config)
    const { args } = config

    args.resolverName = `${args.name}Resolver`
    args.srcPath = (...parts) => path.resolve(cwd, 'src', 'v5', ...parts)
    args.testPath = (...parts) =>
      path.resolve(cwd, 'src', 'v5', '__tests__', ...parts)

    return { ...config, args }
  },
}

const path = require('path')
const cwd = process.cwd()
module.exports = {
  params: config => {
    console.log(config)
    const { args } = config
    args.basePath = path.resolve(cwd, 'src','v5')
    if (args.dir) {
      path.resolverPath = path.join(args.basePath, 'resolvers', name, 'index.ts')
      path.resolverSpecPath = path.join(args.basePath, 'resolvers', name, '__tests__', `${name}.spec.ts`)
    } else {
      path.resolverPath = path.join(args.basePath, 'resolvers', `${name}.ts`)
      path.resolverSpecPath = path.join(args.basePath, 'resolvers', name, '__tests__', `${name}.spec.ts`)
    }
    args.resolverName = `${args.name}Resolver`

    args.resolverSpecDescription = `${args.name}Resolver(config: HygenConfig): HygenConfig`
    args.resolverSpecImportPath = `../${name}`

    return { ...config, args }
  },
}

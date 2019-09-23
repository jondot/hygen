const path = require('path')
const cwd = process.cwd()
module.exports = {
  params: config => {
    console.log(config)
    const { args } = config
    args.basePath = path.resolve(cwd, 'src','v5')
    if (args.dir) {
      args.resolverPath = path.join(args.basePath, 'resolvers', args.name, 'index.ts')
      args.resolverSpecPath = path.join(args.basePath, 'resolvers', args.name, '__tests__', `${args.name}.spec.ts`)
    } else {
      args.resolverPath = path.join(args.basePath, 'resolvers', `${args.name}.ts`)
      args.resolverSpecPath = path.join(args.basePath, 'resolvers', args.name, '__tests__', `${args.name}.spec.ts`)
    }
    args.resolverName = `${args.name}Resolver`

    args.resolverSpecDescription = `${args.name}Resolver(config: HygenConfig): HygenConfig`
    args.resolverSpecImportPath = `../${args.name}`

    return { ...config, args }
  },
}

const path = require('path')

module.exports = {
  params: config => {
    const { args } = config
    if (!args.dir) {
      console.log("I don't know which dir to place this in")
      exit(1)
    }

    args.basePath = path.join('.','src','v5')

    args.resolverPath = path.join(args.basePath, 'resolvers', args.dir, `${args.name}.ts`)
    args.importPath = path.join(args.basePath, 'resolvers', args.dir, `index.ts`)
    args.resolverSpecPath = path.join(args.basePath, 'resolvers', args.dir, '__tests__', `${args.name}.spec.ts`)

    args.resolverName = `${args.name}Resolver`

    args.resolverSpecDescription = `${args.name}Resolver(config: HygenConfig): HygenConfig`
    args.resolverSpecImportPath = `../${args.name}`

    console.log('resolver extend', args)

    return { ...config, args }
  },
}

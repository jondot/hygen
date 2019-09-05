const { nameMaker, paths, cssFilename } = require(process.cwd() + '/.hygen.js').helpers

module.exports = {
  params: ({ args }) => {
    if (!args.name) {
      console.log(args)
      console.log('Must provide --name')
      process.exit(1)
    }
    const mk = nameMaker(args)
    const generatorDir =paths.templates.add(mk.name)
    const actionDir = generatorDir.add(args.action || 'new')

    args.ext = args.ext || 'js'
    args.templatePath = actionDir.path(`${mk.name}.${args.ext}.t`)
    args.indexPath = actionDir.path('index.js')
    args.cssPath = args.css ? actionDir.path(cssFilename + '.t') : null
    args.helpMessagePath = args.withHelp ? generatorDir.path('help','message.txt') : null

    console.log('template args: ', args)
    return args
  },
}


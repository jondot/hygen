---
to: <%- indexPath %>
---
<%- '---' %>
to: <%- h.tagAround('indexPath') %>
<%- '---' %>
const {pathTo, nameMaker, tagAround, cssj hyteFilename} = require('../../../.hygen.js').helpers

module.exports = {
  /* TODO I should be able to get config as well
  params: ({args, config}) => { */
  params: ({args}) => {
    /* TODO this code should go in a preParams function */
    //region
    if (!args.name) {
      console.log(args)
      console.log('Must provide --name')
      process.exit(1)
    }
    const mk = nameMaker(args)
    const baseDir = paths.CHANGE_ME.add(mk.name)
    //endregion

    args.cssPath = baseDir.path(cssFilename + '.t')
    args.indexPath = baseDir.path('index.js')
    args.templatePath = baseDir.path('index.js.t')

    /* TODO this should go in a postParams function */
    //region
    /* TODO should use logger */
    if (args.v || args.verbose) console.log('template args: ', args)
    //endregion

    return args
  },
}

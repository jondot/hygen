// @flow

import type { RenderedAction } from './types'

const L = require('lodash')
const fs = require('fs-extra')
const ejs = require('ejs')
const { map, filter } = require('lodash/fp')
const fm = require('front-matter')
const path = require('path')
const context = require('./context')

const renderTemplate = (tmpl, locals) => ejs.render(tmpl, context(locals))

const render = (args: any): (string => Array<RenderedAction>) =>
  L.flow(
    actionfolder =>
      map(_ => path.join(actionfolder, _))(fs.readdirSync(actionfolder)),
    filter(f => fs.lstatSync(f).isFile()),
    map(file => ({ file, text: fs.readFileSync(file).toString() })),
    map(({ file, text }) => Object.assign({ file }, fm(text))),
    map(({ file, attributes, body }) => ({
      file,
      attributes: L.mapValues(attributes, _ => renderTemplate(_, args)),
      body: renderTemplate(body, args)
    }))
  )
module.exports = render

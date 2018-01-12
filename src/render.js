// @flow

import type { RenderedAction } from './types'

const L = require('lodash')
const fs = require('fs-extra')
const ejs = require('ejs')
const { map, filter } = require('lodash/fp')
const fm = require('front-matter')
const path = require('path')
const context = require('./context')

const ignores = ['prompt.js']
const renderTemplate = (tmpl, locals) =>
  L.isString(tmpl) ? ejs.render(tmpl, context(locals)) : tmpl

const render = (args: any): Array<RenderedAction> =>
  L.flow(
    ({ actionfolder }) =>
      map(_ => path.join(actionfolder, _))(fs.readdirSync(actionfolder)),
    filter(f => !L.find(ignores, ig => L.endsWith(f, ig))),
    filter(f => fs.lstatSync(f).isFile()),
    filter(f => (args.subaction ? f.match(args.subaction) : true)),
    map(file => ({ file, text: fs.readFileSync(file).toString() })),
    map(({ file, text }) => Object.assign({ file }, fm(text))),
    map(({ file, attributes, body }) => ({
      file,
      attributes: L.mapValues(attributes, _ => renderTemplate(_, args)),
      body: renderTemplate(body, args)
    }))
  )(args)
module.exports = render

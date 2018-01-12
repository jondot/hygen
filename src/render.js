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

const render = async (args: any): Array<RenderedAction> =>
  await fs
    .readdir(args.actionfolder)
    .then(map(_ => path.join(args.actionfolder, _)))
    .then(filter(f => !L.find(ignores, ig => L.endsWith(f, ig))))
    .then(map(file => fs.lstat(file).then(stat => ({ file, stat }))))
    .then(_ => Promise.all(_))
    .then(
      filter(
        ({ file, stat }) =>
          stat.isFile() && (args.subaction ? file.match(args.subaction) : true)
      )
    )
    .then(map(({ file }) => file))
    .then(
      map(file =>
        fs.readFile(file).then(text => ({ file, text: text.toString() }))
      )
    )
    .then(_ => Promise.all(_))
    .then(map(({ file, text }) => Object.assign({ file }, fm(text))))
    .then(
      map(({ file, attributes, body }) => ({
        file,
        attributes: L.mapValues(attributes, _ => renderTemplate(_, args)),
        body: renderTemplate(body, args)
      }))
    )

module.exports = render

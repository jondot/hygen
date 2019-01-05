// @flow

import type { RenderedAction, RunnerConfig } from './types'

const L = require('lodash')
const fs = require('fs-extra')
const ejs = require('ejs')
const fm = require('front-matter')
const path = require('path')
const context = require('./context')

// for some reason lodash/fp takes 90ms to load.
// inline what we use here with the regular lodash.
const map = f => arr => L.map(arr, f)
const filter = f => arr => L.filter(arr, f)

const ignores = ['prompt.js', 'index.js']
const renderTemplate = (tmpl, locals, config) =>
  L.isString(tmpl) ? ejs.render(tmpl, context(locals, config)) : tmpl

const render = async (
  args: any,
  config: RunnerConfig
): Promise<Array<RenderedAction>> =>
  await fs
    .readdir(args.actionfolder)
    .then(things => things.sort((a, b) => a.localeCompare(b)))
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
        attributes: L.mapValues(attributes, _ =>
          renderTemplate(_, args, config)
        ),
        body: renderTemplate(body, args, config)
      }))
    )

module.exports = render

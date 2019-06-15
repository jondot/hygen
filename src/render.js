// @flow

import type { RenderedAction, RunnerConfig } from './types'

const L = require('lodash')
const fs = require('fs-extra')
const ejs = require('ejs')
const fm = require('front-matter')
const path = require('path')
const context = require('./context')
const { resolve } = require('path')
const resolvePlugins = require('./plugins')

// for some reason lodash/fp takes 90ms to load.
// inline what we use here with the regular lodash.
const map = f => arr => L.map(arr, f)
const filter = f => arr => L.filter(arr, f)

const ignores = ['prompt.js', 'index.js']
const renderTemplate = (tmpl, tmplCtx) =>
  L.isString(tmpl) ? ejs.render(tmpl, tmplCtx) : tmpl

async function getFiles(dir) {
  const subdirs = await fs.readdir(dir)
  const files = await Promise.all(
    subdirs.map(async subdir => {
      const res = resolve(dir, subdir)
      return (await fs.stat(res)).isDirectory() ? getFiles(res) : res
    }),
  )
  return Array.prototype.concat(...files)
}

const render = async (
  args: any,
  config: RunnerConfig,
): Promise<Array<RenderedAction>> =>
  await getFiles(args.actionfolder)
    .then(things => things.sort((a, b) => a.localeCompare(b))) // TODO: add a test to verify this sort
    .then(filter(f => !L.find(ignores, ig => L.endsWith(f, ig)))) // TODO: add a test for ignoring prompt.js and index.js
    .then(filter(file => (args.subaction ? file.match(args.subaction) : true)))
    .then(
      map(file =>
        fs.readFile(file).then(text => ({ file, text: text.toString() })),
      ),
    )
    .then(_ => Promise.all(_))
    .then(map(({ file, text }) => Object.assign({ file }, fm(text))))
    .then(arr => resolvePlugins(arr, config, args))
    .then(
      map(({ file, attributes, body, pluginResults }) => {
        const ctx = context(args, config, pluginResults)

        return {
          file,
          attributes: L.mapValues(attributes, _ => renderTemplate(_, ctx)),
          body: renderTemplate(body, ctx),
        }
      }),
    )

module.exports = render

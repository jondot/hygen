import { RenderedAction, RunnerConfig } from './types'

const fs = require('fs-extra')
const ejs = require('ejs')
const fm = require('front-matter')
const path = require('path')
const walk = require('ignore-walk')
const context = require('./context')

// for some reason lodash/fp takes 90ms to load.
// inline what we use here with the regular lodash.
const map = f => arr => arr.map(f)
const filter = f => arr => arr.filter(f)

const ignores = [
  'prompt.js',
  'index.js',
  '.hygenignore',
  '.DS_Store',
  '.Spotlight-V100',
  '.Trashes',
  'ehthumbs.db',
  'Thumbs.db',
]
const renderTemplate = (tmpl, locals, config) =>
  typeof tmpl === 'string' ? ejs.render(tmpl, context(locals, config)) : tmpl

async function getFiles(dir) {
  const files = walk
    .sync({ path: dir, ignoreFiles: ['.hygenignore'] })
    .map(f => path.join(dir, f))
  return files
}

const render = async (
  args: any,
  config: RunnerConfig,
): Promise<RenderedAction[]> =>
  getFiles(args.actionfolder)
    .then(things => things.sort((a, b) => a.localeCompare(b))) // TODO: add a test to verify this sort
    .then(filter(f => !ignores.find(ig => f.endsWith(ig)))) // TODO: add a
    // test for ignoring prompt.js and index.js
    .then(filter(file => (args.subaction ? file.match(args.subaction) : true)))
    .then(
      map(file =>
        fs.readFile(file).then(text => ({ file, text: text.toString() })),
      ),
    )
    .then(_ => Promise.all(_))
    .then(map(({ file, text }) => Object.assign({ file }, fm(text))))
    .then(
      map(({ file, attributes, body }) => ({
        file,
        attributes: Object.entries(attributes).reduce((obj, [key, value]) => {
          return {
            ...obj,
            [key]: renderTemplate(value, args, config),
          }
        }, {}),
        body: renderTemplate(body, args, config),
      })),
    )

module.exports = render

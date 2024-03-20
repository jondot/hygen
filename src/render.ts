import path from 'path'
import fs from 'fs-extra'
import ejs from 'ejs'
import fm from 'front-matter'
import walk from 'ignore-walk'
import createDebug from 'debug'
import type { RenderedAction, RunnerConfig } from './types'
import context from './context'
const debug = createDebug('hygen:render')

// for some reason lodash/fp takes 90ms to load.
// inline what we use here with the regular lodash.
const map = (f) => (arr) => arr.map(f)
const filter = (f) => (arr) => arr.filter(f)

const ignores = [
  'prompt.js',
  'index.js',
  'prompt.ts',
  'index.ts',
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
    .map((f) => path.join(dir, f))
  return files
}

const render = async (
  args: any,
  config: RunnerConfig,
): Promise<RenderedAction[]> =>
  getFiles(args.actionFolder)
    .then((things) => things.sort((a, b) => a.localeCompare(b))) // TODO: add a test to verify this sort
    .then(filter((f) => !ignores.find((ig) => f.endsWith(ig)))) // TODO: add a
    // test for ignoring prompt.js and index.js
    .then(
      filter((file) =>
        args.subAction
          ? file.replace(args.actionFolder, '').match(args.subAction)
          : true,
      ),
    )
    .then(
      map((file) =>
        fs.readFile(file).then((text) => ({ file, text: text.toString() })),
      ),
    )
    .then((_) => Promise.all(_))
    .then(
      map(({ file, text }) => {
        debug('Pre-formatting file: %o', file)
        return { file, ...fm(text, { allowUnsafe: true }) }
      }),
    )
    .then(
      map(({ file, attributes, body }) => {
        const renderedAttrs = Object.entries(attributes).reduce(
          (obj, [key, value]) => {
            return {
              ...obj,
              [key]: renderTemplate(value, args, config),
            }
          },
          {},
        )
        debug('Rendering file: %o', file)
        return {
          file,
          attributes: renderedAttrs,
          body: renderTemplate(
            body,
            { ...args, attributes: renderedAttrs },
            config,
          ),
        }
      }),
    )

export default render

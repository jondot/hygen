import ejs from 'ejs'
import fs from 'fs-extra'
import fm from 'front-matter'
import { RunnerConfig, Attribute, RenderedAction } from '../types'
import context from '../context'

const readFiles = (files: string[]) => {
  return Promise.all(
    files.map((file) => {
      return fs.readFile(file).then((text) => ({ file, text: text.toString() }))
    }),
  )
}

const renderTemplate = (tmpl, locals, config) => {
  const renderContext = context(locals, config)

  return typeof tmpl === 'string' ? ejs.render(tmpl, renderContext) : tmpl
}
const renderAttrs = (attributes, args, config) => {
  return Object.entries(attributes).reduce((obj, [key, value]) => {
    return {
      ...obj,
      [key]: renderTemplate(value, args, config),
    }
  }, {} as Attribute)
}

const renderFiles = async (files: any[], args: any, config: RunnerConfig) => {
  const fileDatas = await readFiles(files)
  const filesFrontmatted = fileDatas.map(({ file, text }) => ({
    file,
    ...fm(text, { allowUnsafe: true }),
  }))

  const promises = filesFrontmatted.map(async ({ file, attributes, body }) => {
    const renderedAttrs = renderAttrs(attributes, args, config)

    const renderedAction = {
      file,
      attributes: renderedAttrs,
      body: renderTemplate(
        body,
        { ...args, attributes: renderedAttrs },
        config,
      ),
    }

    return renderedAction as RenderedAction
  })

  return Promise.all(promises)
}

export default renderFiles

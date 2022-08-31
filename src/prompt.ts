import path from 'path'
import fs from 'fs'
import type { Prompter } from './types'
import helpers from './helpers'

const hooksfiles = [
  'index.js',
  'index.ts',
  'prompt.cjs',
  'prompt.js',
  'prompt.ts',
]
const prompt = async <Q, T>(
  createPrompter: () => Prompter<Q, T>,
  actionfolder: string,
  args: Record<string, any>,
): Promise<T | object> => {
  const hooksfile = hooksfiles
    .map((f) => path.resolve(path.join(actionfolder, f)))
    .find((f) => fs.existsSync(f))

  if (!hooksfile) {
    return Promise.resolve({})
  }
  const isTypeScriptHook = /\.ts$/.test(hooksfile)

  // Lazily support TS hook files
  if (isTypeScriptHook) {
    require('ts-node/register/transpile-only')
  }
  // shortcircuit without prompter
  let hooksModule = await import(hooksfile)
  if (hooksModule.default) {
    hooksModule = hooksModule.default
  }

  if (hooksModule.params) {
    return hooksModule.params({ args, h: helpers })
  }

  // lazy loads prompter
  // everything below requires it
  const prompter = createPrompter()
  if (hooksModule.prompt) {
    return hooksModule.prompt({
      prompter,
      inquirer: prompter,
      args,
      h: helpers,
    })
  }

  return prompter.prompt(
    // prompt _only_ for things we've not seen on the CLI
    hooksModule.filter(
      (p) =>
        args[p.name] === undefined ||
        args[p.name] === null ||
        args[p.name].length === 0,
    ),
  )
}

export default prompt

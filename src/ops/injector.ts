import { EOL } from 'os'
import { RenderedAction } from '../types'

const getPragmaticIndex = (pattern, lines, isBefore) => {
  const oneLineMatchIndex = lines.findIndex((l) => l.match(pattern))

  if (oneLineMatchIndex < 0) {
    const fullText = lines.join(EOL)
    const fullMatch = fullText.match(new RegExp(pattern, 'm'))

    if (fullMatch && fullMatch.length) {
      if (isBefore) {
        const fullTextUntilMatchStart = fullText.substring(0, fullMatch.index)
        return fullTextUntilMatchStart.split(EOL).length - 1
      }
      const matchEndIndex = fullMatch.index + fullMatch.toString().length
      const fullTextUntilMatchEnd = fullText.substring(0, matchEndIndex)
      return fullTextUntilMatchEnd.split(EOL).length
    }
  }

  return oneLineMatchIndex + (isBefore ? 0 : 1)
}

const locations = {
  at_line: (_) => _,
  prepend: (_) => 0,
  append: (_, lines) => lines.length - 1,
  before: (_, lines) => getPragmaticIndex(_, lines, true),
  after: (_, lines) => getPragmaticIndex(_, lines, false),
}

const indexByLocation = (attributes: any, lines: string[]): number => {
  const pair = Object.entries(attributes).find(([k, _]) => locations[k])
  if (pair) {
    const [k, v] = pair
    return locations[k](v, lines)
  }
  return -1
}

const injector = (action: RenderedAction, content: string): string => {
  const {
    attributes: { skip_if, eof_last },
    attributes,
    body,
  } = action
  const lines = content.split(EOL)
  // eslint-disable-next-line
  const shouldSkip = skip_if && !!content.match(skip_if);

  if (!shouldSkip) {
    const idx = indexByLocation(attributes, lines)
    // eslint-disable-next-line
    const trimEOF = idx >= 0 && eof_last === false && /\r?\n$/.test(body);
    // eslint-disable-next-line
    const insertEOF = idx >= 0 && eof_last === true && !/\r?\n$/.test(body);

    if (trimEOF) {
      lines.splice(idx, 0, body.replace(/\r?\n$/, ''))
    } else if (insertEOF) {
      lines.splice(idx, 0, `${body}\n`)
    } else if (idx >= 0) {
      lines.splice(idx, 0, body)
    }
  }

  return lines.join('\n')
}

export default injector

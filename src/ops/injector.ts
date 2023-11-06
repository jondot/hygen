import type { RenderedAction } from '../types'
import newline from '../newline'

const EOLRegex = /\r?\n/

const getPragmaticIndex = (pattern, lines, isBefore) => {
  const oneLineMatchIndex = lines.findIndex((l) => l.match(pattern))

  // joins the text and looks for line number,
  // we dont care about platform line-endings correctness other than joining/splitting
  // for all platforms
  if (oneLineMatchIndex < 0) {
    const fullText = lines.join('\n')
    const fullMatch = fullText.match(new RegExp(pattern, 'm'))

    if (fullMatch && fullMatch.length) {
      if (isBefore) {
        const fullTextUntilMatchStart = fullText.substring(0, fullMatch.index)
        return fullTextUntilMatchStart.split(EOLRegex).length - 1
      }
      const matchEndIndex = fullMatch.index + fullMatch.toString().length
      const fullTextUntilMatchEnd = fullText.substring(0, matchEndIndex)
      return fullTextUntilMatchEnd.split(EOLRegex).length
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
const indexesByLocation = (attributes: any, lines: string[]): number[] => {
  const pairs = Object.entries(attributes).filter(([k, _]) => locations[k]);
  if (pairs.length) {
    const indexes: number[] = []
    pairs.forEach((pair, i) => {
        const [k, v] = pair;
        indexes[i] = locations[k](v, lines);
    })
    return indexes;
  }
};
const injector = (action: RenderedAction, content: string): string => {
  const {
    attributes: { skip_if, eof_last },
    attributes,
    body,
  } = action
  const shouldSkip = skip_if && !!content.match(skip_if)

  if (!shouldSkip) {
    //
    // we care about producing platform-correct line endings.
    // however the "correct" line endings should be detected from the actual
    // CONTENT given, and not the underlying operating system.
    // this is similar to how a text editor behaves.
    //
    const NL = newline(content)
    const lines = content.split(NL)

    // returns -1 (end) if no attrs
    const idxs = indexesByLocation(attributes, lines)
    let idx = -1
    let deleteCount = 0
    if (idxs.length > 2) {
      throw new Error(`Too many injection attributes match '${attributes.join(',')}'! Don't know what to do.`)
    }
    if (idxs.length == 2) {
      idxs.sort((a, b) => a - b) // numeric ascending
      idx = idxs[0]
      deleteCount = idxs[1] - idxs[0]
    }
    if (idxs.length == 1) {
      idx = idxs[0]
      deleteCount = 0
    }

    const trimEOF = idx >= 0 && eof_last === false && /\r?\n$/.test(body)
    const insertEOF = idx >= 0 && eof_last === true && !/\r?\n$/.test(body)

    if (trimEOF) {
      lines.splice(idx, deleteCount, body.replace(/\r?\n$/, ''))
    } else if (insertEOF) {
      lines.splice(idx, deleteCount, `${body}${NL}`)
    } else if (idx >= 0) {
      lines.splice(idx, deleteCount, body)
    }
    return lines.join(NL)
  } else {
    return content
  }
}

export default injector

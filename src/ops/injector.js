// @flow

import type { RenderedAction } from '../types'
const L = require('lodash')

const injector = (action: RenderedAction, content: string): string => {
  const { attributes: { skip_if }, attributes, body } = action
  const lines = content.split('\n')
  //eslint-disable-next-line
  const shouldSkip = skip_if && !!L.find(lines, _ => _.match(skip_if))

  if (!shouldSkip) {
    const idx = indexByLocation(attributes, lines)
    if (idx >= 0) {
      lines.splice(idx, 0, body)
    }
  }
  return lines.join('\n')
}

const before = (_, lines) => L.findIndex(lines, l => l.match(_))
const locations = {
  at_line: _ => _,
  prepend: _ => 0,
  append: (_, lines) => lines.length - 1,
  before,
  after: (_, lines) => before(_, lines) + 1
}
const indexByLocation = (attributes: any, lines: Array<string>): number => {
  const pair = L.find(L.toPairs(attributes), ([k, v]) => locations[k])
  if (pair) {
    const [k, v] = pair
    return locations[k](v, lines)
  }
  return -1
}

module.exports = injector

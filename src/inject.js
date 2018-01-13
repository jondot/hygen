// @flow

import type { RenderedAction } from './types'
const L = require('lodash')

const before = (_, lines) => L.findIndex(lines, l => l.match(_))
const locations = {
  at_line: _ => _,
  prepend: _ => 1,
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
const inject = (action: RenderedAction, intoText: string): RenderedAction => {
  const { attributes, body } = action
  const lines = intoText.split('\n')
  const shouldSkip =
    attributes.skip_if && !!L.find(lines, _ => _.match(attributes.skip_if))

  if (!shouldSkip) {
    const idx = indexByLocation(attributes, lines)
    if (idx >= 0) {
      lines.splice(idx, 0, body)
    }
  }
  const injected = lines.join('\n')
  return { ...action, body: injected }
}

module.exports = inject

import {tagAround} from '../utils'

describe('tagAround(name)', () => {
  it('should be a function', () => {
    expect(tagAround).toBeFunction()
  })
  it('should return a string', () => {
    const result = tagAround('Woot')
    expect(result).toBeString()
  })
  it('should return a formatted ejs template string', () => {
    const result = tagAround('Woot')
    expect(result).toEqual('<%- Woot %>')
  })
})

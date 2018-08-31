const path = require('path')
const fs = require('fs')
const render = require('../render')




const fixture = name => path.join(__dirname, './fixtures', name)

describe('render ng', () => {
  it('empty', async () => {
    const res = await render({ actionfolder: fixture('app/action-empty') })
    expect(res[0].file).toMatch(/empty/)
    res[0].file = 'empty.ejs.t'
    expect(res[0].body).toEqual('')
  })
  it('full', async () => {
    const res = await render({
      bill: 17,
      name: 'someone',
      actionfolder: fixture('app/action-full')
    })
    expect(res[0].file).toMatch(/full/)
    res[0].file = 'full.ejs.t'
    expect(res[0].body).toMatch('Find me at <i>app/mailers/hello/html.ejs</i>')
    expect(res[0].body).toMatch('You owe 17')
  })

  it('capitalized', async () => {
    const res = await render({
      name: 'someone',
      actionfolder: fixture('app/action-capitalized')
    })
    expect(res[0].file).toMatch(/capitalized/)
    res[0].file = 'capitalize.ejs.t'
    expect(res[0].body).toMatch(/someone and Someone/)
  })
  it('capitalized with default locals', async () => {
    const res = await render({
      actionfolder: fixture('app/action-capitalized-defaults')
    })
    expect(res[0].file).toMatch(/capitalized/)
    res[0].file = 'capitalize.ejs.t'
    expect(res[0].body).toMatch(/unnamed and Unnamed/)
  })

  it('render should do all files in an action folder ', async () => {
    const res = await render({
      bill: 17,
      actionfolder: fixture('app/action-multifiles')
    })
    expect(res.length).toEqual(2)
    expect(res[0].file).toMatch(/capitalized/)
    expect(res[1].file).toMatch(/full/)
  })

  it('render with subaction should filter only to that subaction', async () => {
    const res = await render({
      bill: 17,
      actionfolder: fixture('app/action-multifiles'),
      subaction: 'capitalized'
    })
    expect(res.length).toEqual(1)
    expect(res[0].file).toMatch(/capitalized/)
  })
  it('inject', async () => {
    const res = await render({
      name: 'devise',
      actionfolder: fixture('app/action-inject')
    })
    expect(res[0].file).toMatch(/inject/)
    res[0].file = 'inject.ejs.t'
    expect(res[0].body).toMatch("gem 'devise'")
  })
})

const render = require('../render')
const path = require('path')
const ftest = require('../test/ftest')
const fs = require('fs')
const fixture = name =>
  fs.readFileSync(path.join(__dirname, './fixtures', name)).toString()

describe('render', () => {
  ftest(
    'empty',
    { app: { action: { 'empty.ejs.t': fixture('empty.ejs.t') } } },
    async () => {
      const res = await render({ actionfolder: 'app/action' })
      expect(res[0].file).toMatch(/empty/)
      res[0].file = 'empty.ejs.t'
      expect(res[0].body).toEqual('')
    }
  )
  ftest(
    'full',
    { app: { action: { 'full.ejs.t': fixture('full.ejs.t') } } },
    async () => {
      const res = await render({
        bill: 17,
        name: 'someone',
        actionfolder: 'app/action'
      })
      expect(res[0].file).toMatch(/full/)
      res[0].file = 'full.ejs.t'
      expect(res[0].body).toMatch(
        'Find me at <i>app/mailers/hello/html.ejs</i>'
      )
      expect(res[0].body).toMatch('You owe 17')
    }
  )

  ftest(
    'capitalized',
    { app: { action: { 'capitalized.ejs.t': fixture('capitalized.ejs.t') } } },
    async () => {
      const res = await render({ name: 'someone', actionfolder: 'app/action' })
      expect(res[0].file).toMatch(/capitalized/)
      res[0].file = 'capitalize.ejs.t'
      expect(res[0].body).toMatch(/someone and Someone/)
    }
  )

  ftest(
    'capitalized with default locals',
    { app: { action: { 'capitalized.ejs.t': fixture('capitalized.ejs.t') } } },
    async () => {
      const res = await render({ actionfolder: 'app/action' })
      expect(res[0].file).toMatch(/capitalized/)
      res[0].file = 'capitalize.ejs.t'
      expect(res[0].body).toMatch(/unnamed and Unnamed/)
    }
  )

  ftest(
    'render should do all files in an action folder ',
    {
      app: {
        action: {
          'capitalized.ejs.t': fixture('capitalized.ejs.t'),
          'full.ejs.t': fixture('full.ejs.t')
        }
      }
    },
    async () => {
      const res = await render({ bill: 17, actionfolder: 'app/action' })
      expect(res.length).toEqual(2)
      expect(res[0].file).toMatch(/capitalized/)
      expect(res[1].file).toMatch(/full/)
    }
  )

  ftest(
    'render with subaction should filter only to that subaction',
    {
      app: {
        action: {
          'capitalized.ejs.t': fixture('capitalized.ejs.t'),
          'full.ejs.t': fixture('full.ejs.t')
        }
      }
    },
    async () => {
      const res = await render({
        bill: 17,
        actionfolder: 'app/action',
        subaction: 'capitalized'
      })
      expect(res.length).toEqual(1)
      expect(res[0].file).toMatch(/capitalized/)
    }
  )
  ftest(
    'inject',
    {
      app: {
        action: { 'inject.ejs.t': fixture('inject.ejs.t') }
      }
    },
    async () => {
      const res = await render({
        name: 'devise',
        actionfolder: 'app/action'
      })
      expect(res[0].file).toMatch(/inject/)
      res[0].file = 'inject.ejs.t'
      expect(res[0].body).toMatch("gem 'devise'")
    }
  )
})

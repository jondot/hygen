const path = require('path')
const fs = require('fs')
const render = require('../render')

const fixture = name => path.join(__dirname, './fixtures', name)

describe('render ng', () => {
  it('should provide correct file name and body should be empty if template is empty', async () => {
    // setup
    const expectedFile = /empty/;
    const expectedBody = '';
    // act
    const actual = await render({ actionfolder: fixture('app/action-empty') });
    const actualFile = actual[0].file;
    const actualBody = actual[0].body;
    // assert
    expect(actualFile).toMatch(expectedFile);
    expect(actualBody).toEqual(expectedBody);
  });
  it('should provide correct file name full and apply variable correctly ', async () => {
    // setup
    const expectedVariableText = /You owe 17/;
    const expectedFileName = /full/;
    const expectedFilePath = 'foo/someone/bar';
    // act
    const actual = await render({
                    bill: 17,
                    name: 'someone',
                    actionfolder: fixture('app/action-full')
                  });
    // get template that was loaded
    const actualFile = actual[0].file;
    // get the To that was generated
    const actualTo = actual[0].attributes.to;
    // get body that was generated from template
    const actualBody = actual[0].body;
    // assert
    // is correct template file
    expect(actualFile).toMatch(expectedFileName);
    // generated the correct To file
    expect(actualTo).toMatch(expectedFilePath);
    // i guess just testing this text is still there
    expect(actualBody).toMatch('Find me at <i>app/mailers/hello/html.ejs</i>');
    // applied bill variable correctly
    expect(actualBody).toMatch(expectedVariableText)
  });

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

  it('render should include files sorted into subfolders', async () => {
    const res = await render({
      bill: 17,
      actionfolder: fixture('app/action-multifiles-nest')
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

  it('should allowrs to use changeCase helpers in templates', async () => {
    const res = await render({
      name: 'FooBar',
      actionfolder: fixture('app/action-change-case')
    })
    expect(res[0].file).toMatch(/snake/)
    res[0].file = 'snake.ejs.t'
    expect(res[0].body).toMatch(/foo_bar/)
  })
})

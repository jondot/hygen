weeks = Array.from(new Array(52).keys()).map(i => ({
  name: `Week ${i + 1}`,
  filename: `week_${('' + i).padStart(2, '0')}`,
}))

module.exports = {
  params: config => vectorRender('_templates/gen/action/week.ts', weeks, config)
    .then(config => {
      config.params.codePath = config.tools.pathTo.add('src', 'sample')
      config.params.testsPath = config.tools.pathTo.add('src', '__tools__', 'sample')
    }),

}

// render the same template multiple times with different sets of data
const vectorRender = (templatePath, vector, config) => {
  const vectorTemplates = config.generator.templates
    .filter(({file}) => file === templatePath)
  const otherTemplates = config.generator.templates
    .find(({file}) => file !== templatePath)

  config.generator.templates = otherTemplates
  vectorTemplates.forEach(({file, attributes, body}) => {
    vector.forEach(attr => {
      config.generator.templates.push({
        file,
        body,
        attributes: {...attributes, ...attr}
      })
    })
  })
  return Promise.resolve(config)
}

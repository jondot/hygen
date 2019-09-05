---
to: <%-   process.cwd() + '/.hygen.js'   %>
---
const pathTo = require('./src/pathTo').pathTo
const nameMaker = require('./src/nameMaker').nameMaker
const basePath = new pathTo(process.cwd())
const srcPath = basePath.add('<%- srcDir %>')

const paths = {
  root: basePath,
  srcPath: srcPath,
<%- subDirs.map(subDir => `  ${subDir}: srcPath.add(${subDir})`).join(",\n") %>
}

module.exports = {
  helpers: {
    cssFilename: 'styles.module.css',
    nameMaker,
    pathTo: basePath,
    paths,
  },
}

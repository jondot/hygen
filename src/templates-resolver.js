const L = require('lodash')
const fs = require('fs')
const path = require('path')
module.exports = (cwd, defaultTemplates) => {
  return (
    L.find(
      [
        path.join(cwd, process.env.HYGEN_TMPLS || '_templates'),
        path.join(cwd, '_templates')
      ],
      _ => fs.existsSync(_)
    ) || defaultTemplates
  )
}

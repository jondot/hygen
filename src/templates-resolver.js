// @flow

const L = require('lodash')
const fs = require('fs-extra')
const path = require('path')
module.exports = (cwd: string, defaultTemplates: string): string => {
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

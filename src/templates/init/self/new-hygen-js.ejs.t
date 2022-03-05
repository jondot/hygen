---
to: "<%= locals.tmplsDir != '_templates' ? `${cwd}/.hygen.js` : null %>"
after: module.exports
skip_if: <%= marker %>
---
<%= marker %>

module.exports = {
    templates: `${__dirname}/<%= tmplsDir %>`
}
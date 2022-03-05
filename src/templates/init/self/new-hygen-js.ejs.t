---
to: <%= cwd %>/.hygen.js
after: module.exports
skip_if: <%= marker %>
---
<%= marker %>

module.exports = {
    templates: `${__dirname}/<%= tmplsDir %>`
}
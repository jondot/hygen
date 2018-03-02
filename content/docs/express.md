---
title: Express
doc: 3
section: 3
category: "tech"
type: "doc"
---

[Express.js](https://expressjs.com/) is arguably the most popular web framework for Node.js

A typical app structure for express celebrates the notion of `routes` and `handlers`, while views and data are left for interpretation (probably because the rise of microservices and client-side apps).

So an app structure may look like this:

```
app/
  routes.js
  handlers/
    health.js
    shazam.js
```

While `routes.js` glues everything together:

```javascript
// ... some code ...
const health = require('./handlers/health')
const shazam = require('./handlers/shazam')
app.get('/health', health)
app.post('/shazam', shazam)

module.exports = app
```

Unlike React Native, you could dynamically load modules here. However, there's still a need for judgement when constructing the routes (`app.get/post` part).

Using `hygen` let's see how we could build something like this:

```
$ hygen route new --method post --name auth
```

Since we've been through a few templates as with [previous](/redux) [use cases](/react-native), let's jump straight to the interesting part, the inject part.

So let's say our generator is structured like this:

```
_templates/
  route/
    new/
      handler.ejs.t
      inject_handler.ejs.t
```

Then `inject_handler` looks like this:

```yaml
---
inject: true
to: app/routes.js
skip_if: <%= name %>
before: "module.exports = app"
---
app.<%= method %>('/<%= name %>', <%= name %>)
```

Note how we're anchoring this inject to `before: "module.exports = app"`. If in previous occasions we appended content to a given line, we're now prepending it.

---
title: Redux
doc: 1
section: 3
category: "tech"
type: "doc"
---

Redux is the posterchild of `hygen`. It doesn't matter what level of granularity you select for your Redux architecture, you're still going to end up with a lot of boilerplate.

For my app architecture I mostly choose [ducks](https://github.com/erikras/ducks-modular-redux), which helps remove a little bit of boilerplate and have modularity baked in.

My typical Redux architecture would look like this:

```bash{6,15-18}
app/
  components/
    icon.js
    avatar.js
  modules/
    boot.js     <---- glues modules together, requires chat, app, and auth.
    app/
      index.js
      view.js
      state.js
    auth/
      index.js
      view.js
      state.js
    chat/
      index.js  <---- the 'connect' bit for Redux.
      view.js   <---- the view, separated, for testing.
      state.js  <---- reducer, actions, types, selectors.
```

## Adding a Module

Being a modular architecture, there's a huge plus for adding a module. It just means adding a folder, and `index`, `view`, `state`, perhaps a default `component`, a storybook `story`, and wiring every thing togather such as a `reducer`, exported `actions` and more in `boot.js`. Fun.

Should be a breeze with `hygen`. Here's how your templates look like:

```bash{7}
_templates/
  module/
    new/
      index.ejs.t
      view.ejs.t
      state.ejs.t
      inject_boot.ejs.t   <--- adds a 'require' clause to boot.js
```

Here's how `index` looks like:

```javascript
---
to: app/modules/<%= name %>/index.js
---
//
// requires, mappings, etc....
//
export default connect(...)(<%= Name %>)
```

A similar trick would do for `view` and `state`.

How would we add a require line given that `boot.js` looks like this?

```javascript{3}
// ... some bootstrapping code ...

const modules = [
  //     `--- we want to inject "after" this
  require('auth').default,
  require('app').default
]

// ... rest of bootstrapping code ...
```

Let's build `inject_boot.ejs.t`. We have to use `inject: true` because this is an inject template and to locate our injected line after `const modules =...`:

```javascript
---
to: app/modules/boot.js
inject: true
skip_if: <%= name %>
after: "const modules = ["
---
require('./<%= name %>).default,
```

After running it, we end up with this:

```javascript{4}
// ... some bootstrapping code ...

const modules = [
  require('chat').default
  require('auth').default,
  require('app').default
]

// ... rest of bootstrapping code ...
```

And we're done! Generating a new module is saying this:

```
$ hygen module new --name settings
```

# Redux

Redux is the posterchild of `hygen`. It doesn't matter what level of granularity you select for your Redux architecture, you're still going to end up with a lot of boilerplate.

These days I choose [ducks](https://github.com/erikras/ducks-modular-redux), to remove a little bit of boilerplate and have modularity baked in any app I build.

My typical Redux architecture would look like this:


```
app/
  components/
    icon.js
    avatar.js
  modules/
    boot.js     <---- glues modules together, requires chat, app, and auth.
    chat/
      index.js  <---- the 'connect' bit for Redux.
      view.js   <---- the view, separated, for testing.
      state.js  <---- reducer, actions, types, selectors.
    app/
      index.js
      view.js
      state.js
    auth/
      index.js
      view.js
      state.js
```

## Adding a Module

Adding a new module is very easy with `hygen`. Here's how your templates look like:

```
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

```javascript
// ... some bootstrapping code ...

const modules = [
    // <--- we want to inject a line here!
    require('chat').default,
    require('auth').default,
    require('app').default,
]

// ... rest of bootstrapping code ...
```

Let's build `inject_boot`:

```javascript
---
to: app/modules/boot.js
inject: true
skip_if: <%= name %>
after: "const modules = ["
---
require('./<%= name %>).default,
```

And we're done! Generating a new module is saying this:

```
$ hygen module new --name settings
```

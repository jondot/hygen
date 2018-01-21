# React Native

While the [Redux use case](1-redux.md) is more than suitable to use for React Native, we have one unique (and arguably limiting) property of the React Native packager which is: you can't require anything dynamically.

So all of the fancy glob-and-require code that's supposed to glue up many files can't be done. This means more manual work and bookkeeping.

```javascript
// this can't be done
each(m=>require(m), glob('modules/**/state'))
```

## Injecting with `hygen`

Using `hygen` we can help ourselves maintain these dependencies.

Having that every module, component or file that you add is generated with `hygen`, we could do something like this:

```
_templates/
   component/
     new/
       component.ejs.t
       inject_component.ejs.t <---- let's look at this
```

And here's how `inject_component` looks like:

```javascript
---
to: app/globs/all-components.js
inject: true
skip_if: <%= name %>
after: "const components = ["
---
require('./<%= name %>).default,
```

This assumes we have a central file in `globs/all-components.js` that we use to glue all components to one re-exportable module.

Now we could do something fun like this:

```javascript
import { Icon, Avatar } from 'app/globs/all-components'
```


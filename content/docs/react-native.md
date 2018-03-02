---
title: React Native
doc: 2
section: 3
category: "tech"
type: "doc"
---

While the [Redux use case](/redux) is more than suitable to use for React Native, we have one unique (and arguably limiting) property of the React Native packager which is: you can't require anything dynamically.

So all of the fancy glob-and-require code that's supposed to glue up many files can't be done. This means more manual work and bookkeeping.

```javascript
// this can't be done
each(m => require(m), glob('modules/**/state'))
```

## Injecting with `hygen`

Using `hygen` we can help ourselves maintain these dependencies.

Having that every module, component or file that you add is generated with `hygen`, we could do something like this:

```bash{5}
_templates/
   component/
     new/
       component.ejs.t
       inject_component.ejs.t <---- let's look at this
```

And here's how `inject_component` looks like:

```javascript
---
inject: true
to: app/globs/all-components.js
skip_if: <%= name %>
after: "const components = ["
---
<%= Name %>: require('../components/<%= name %>').default,
```

This assumes we have a central file in `globs/all-components.js` that we use to glue all components to one re-exportable module:

```javascript
const components = {
  Avatar: require('../components/avatar').default,
  Icon: require('../components/icon').default
}
export default components
```

Running this:

```
$ hygen component new --name intro
```

Will build this:

```javascript{4}
const components = {
  Avatar: require('../components/avatar').default,
  Icon: require('../components/icon').default,
  Intro: require('../components/intro').default
}
export default components
```

Now we could do something fun like this:

```javascript
import { Intro } from 'app/globs/all-components'
```

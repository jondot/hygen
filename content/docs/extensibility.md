---
title: Extensibility
doc: 4
section: 1
category: "tech"
type: "doc"
---

You can extend these properties of Hygen, using a special `.hygen.js` file:

* Helper functions in templates.
* Customizing logger, template location and shell executor.
* (_WIP_) Custom generator operations in addition to the built-in `add`, `inject`, `shell`

# .hygen.js

Hygen supports a bubbling-up mechanism for searching a `.hygen.js` file and loading it. Where ever you run `hygen` from, it will start searching for this file upwards, and stop at the first one it finds.

This means:

* You can set up a _single file_ per project.
* For some special sub-projects, set a different file for a different behavior.
* You can also set up one global file to use if you drop it in your user folder.

_Note:_ The current strategy when there are two or more `.hygen.js` files in the path upwards is to _take the first one_ and ignore the rest.

# Helpers

Here's a template that uses a function that doesn't exist in the helper accessor `h`. This function is plainly called `extended`, for lack of a better name.

```yaml{5}
---
to: given/hygen-js/new.md
---
this demonstrates hygen loaded up .hygen.js and extended helpers.
<%= h.extended('hello') %>
```

In order to add the function `extended` to the standard `hygen` helpers collection, we'll create a `.hygen.js` file at the root of our project:

```
src/
package.json
.hygen.js
```

This `.hygen.js` file will be the home of all of our extension points. For this example, we'll use the following content:

```javascript{3}
module.exports = {
    helpers: {
        extended: s => s.toUpperCase()
    }
}
```

Note that beyond inlining a utility function like in this example, you can require and use any piece of code in your project here and export it for Hygen to use.

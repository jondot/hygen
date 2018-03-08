---
title: "Create"
doc: 2
section: 2
category: "tech"
type: "doc"
---

Maintaining code generators over time can be a challenge in some cases. If you have a bug in the generator, you need to modify your templates, run the modified generator, and then manually import your changes back into the templates while remembering to replace keywords with ejs placeholders.

[`hygen-create`](https://github.com/ronp001/hygen-create) offers an approach to creating new generators: take an existing piece of code and automatically transform it into a generator.

To create a generator using [`hygen-create`](https://github.com/ronp001/hygen-create):
* Start a [`hygen-create`](https://github.com/ronp001/hygen-create) session
* Select files to include in the generator
* Specify a string to automatically turn into ejs snippets in the resulting templates
* Run [`$ hygen-create generate`](https://github.com/ronp001/hygen-create)

That's it!  Your new `hygen` generator is ready, and you can use it to create new "instances" of the code you generalized.  If something's not right, you can fix the problem directly in the generated code, then run [`hygen-create`](https://github.com/ronp001/hygen-create) on the modified code to update the generator with your fix.  It even remembers which files were originally included in the generator, so you don't have to select files all over again.

For more details see [`https://github.com/ronp001/hygen-create`](https://github.com/ronp001/hygen-create)


## Installation

```bash
$ yarn global add hygen-create
```
or
```bash
$ npm install --global hygen-create
```


## Key Features

* String variations (UPPERCASED, CamelCased, etc.) are automatically recognized.  For example:
```json
// if the following 'package.json' is used as a generator source 
// with 'MyPackage' as the templatization string:
{
    "name": "MyPackage",
    "index": "my-package/bin/my_package.js"
}
```
```json
// the resulting generator with '--name NewUnit' will create:
{
    "name": "NewUnit",
    "index": "new-unit/bin/new_unit.js"
}
```
* Directory hierarchy is maintained
* Gradually add files to the generator in a git-like fashion
* Review auto-inserted ejs placeholders with a built-in colorized diff
* Iteratively author generators by running [`hygen-create`](https://github.com/ronp001/hygen-create) again on the code created by the generator.


## GitHub Project

[`https://github.com/ronp001/hygen-create`](https://github.com/ronp001/hygen-create)

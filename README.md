# Hygen

<img src="https://travis-ci.org/jondot/hygen.svg?branch=master">

A simple, fast, and flexible code generator and generator builder.

![](media/hygen.gif)

## Quick Start

```
$ npm i -g hygen
```
`hygen` comes with prepacked templates for node.js workers and mailers, which you probably don't
need if you're not using a `hyperstack`. To see them just run `hygen`.

For your own use, let's create a folder named `_templates` in your project root. In it, build the following template layout:

```
_templates/
  worker/
    new/
      index.ejs.t
```

Here's how:

```
$ mkdir -p _templates/worker/new
$ touch _templates/worker/new/index.ejs.t
```

Next, `index.ejs.t` should contain this (just copy and paste it):

```javascript
---
to: app/workers/<%=name%>.js
---
class <%= h.capitalize(name) %> {
    work(){
        // your code here!
    }
}
```

Finally, you can generate a worker like this:

```
$ hygen worker new --name cleaner

Loaded templates: _templates
       added: app/workers/foo.js
```


## hygen: a New Template Engine

`hygen` was built to have a good developer ergonomics; to avoid
cluttered template projects which are hard to reason about, and
to simplify overly complex generator workflows. 


Ultimately, it cuts the time from having an itch for a template in your current
project to code generated with it and others benefiting from it. 

Let's go over why `hygen` is different. Here's our example from before:

```
_templates/
  worker/
    new/
      index.ejs.t
```

### Template Locality

`hygen` picks up a local `_templates` folder
at any folder level of your project you're working from (or an environment variable, or built-in
templates by building a new library with it).


### Folder Structure is Command Structure

Opinionated towards simplifying making generators; the folder structure _maps directly_ to the command structure:


```
$ hygen worker new --name jobrunner
```

Template parameters are given with `--flag VALUE`, as many as you'd like. In this example we've set a parameter named `name` to the value `jobrunner`.

### Frontmatter for Decluttering

Finally, here's how a template looks like (in our example, `index.ejs.t`). Templates are [ejs](https://github.com/tj/ejs):

```javascript
---
to: app/workers/<%=name%>.js
---

class <%= h.capitalize(name) %> {
    work(){
        // your code here!
    }
}
```

The first part of the template is a [front matter](https://jekyllrb.com/docs/frontmatter/), stolen from Markdown, this is now part of a `hygen` template and is part of the reason of why your templates will feel more lightweight and flexible. 

All frontmatter metadata _are also run through the template engine_ so feel free to use variables as you wish.

There's one required meta variable: `to`. 
`to` points to where this file will be placed (folders are created as needed).

### Build Your Own

`hygen` is highly embeddable. You should be able to use it by simply listing it
as a dependency and having [this kind of workflow](src/index.js) in your binary.

```javascript
const { runner } = require('hygen')
const path = require('path')
const defaultTemplates = path.join(__dirname, 'templates')
runner(defaultTemplates)
```
# Contributing

Fork, implement, add tests, pull request, get my everlasting thanks and a respectable place here :).


### Thanks:

To all [Contributors](https://github.com/jondot/hygen/graphs/contributors) - you make this happen, thanks!


# Copyright

Copyright (c) 2017 [Dotan Nahum](http://gplus.to/dotan) [@jondot](http://twitter.com/jondot). See [LICENSE](LICENSE.txt) for further details.

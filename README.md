<h3 align="center">
  <img src="https://raw.githubusercontent.com/jondot/hygen/master/media/hygen.png" alt="hygen logo" width=400 />
</h3>

[![build status](https://img.shields.io/travis/jondot/hygen/master.svg)](https://travis-ci.org/jondot/hygen)
[![npm version](https://img.shields.io/npm/v/hygen.svg)](https://www.npmjs.com/package/hygen)

`hygen` is the simple, fast, and scalable code generator that lives _in_ your project.

<div align="center">
  <img src="https://raw.githubusercontent.com/jondot/hygen/master/media/hygen.gif" width=600/>
</div>


## Features

✅ Build ad-hoc generators quickly and full on project scaffolds.  
✅ Local generators per project (and global, if you must)  
✅ Built-in scaffolds to quickly create generators  
✅ Full logic templates and rendering  
✅ Prompts and flows for taking in arguments  
✅ Automatic CLI arguments  
✅ Adding new files  
✅ Injecting into existing files  
✅ Running shell commands  
✅ Super fast, constantly optimized for speed  


> New in hygen v4.0.0: a positional `NAME` parameter. 
> Now you can use `$ hygen component new MyComponent` instead of `$ hygen component new --name MyComponent`.

## Used By

<Image alt="Wix" height="32" src="https://upload.wikimedia.org/wikipedia/en/7/76/Wix.com_website_logo.svg"/> &nbsp; &nbsp; <Image alt="Airbnb" height="50" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/512px-Airbnb_Logo_B%C3%A9lo.svg.png"/> &nbsp; &nbsp; <Image alt="Open Data Institute" height="60" src="https://luminategroup.com/storage/538/c/opendatainstitute%28ODI%29-logo%402x-logo.png"/> &nbsp; &nbsp;  <Image alt="Ableneo" height="80" src="https://www.ableneo.com/web/images/logo.svg"/> &nbsp;
<Image alt="City of Amsterdam" height="70" src="https://avatars3.githubusercontent.com/u/14022058?s=200&v=4"/> &nbsp; &nbsp; <Image alt="Accenture" height="80" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Accenture.svg/512px-Accenture.svg.png"/>  &nbsp; <Image alt="Birdie" height="60" src="https://assets.website-files.com/5d07a11d8195605723dbff07/5d09430b3d6e1c5d28a6e2b6_global%E2%80%94birdie_logo_black.svg"/> &nbsp; &nbsp;
<Image alt="Kind" height="80" src="https://madebykind.com/dist/images/logos/site-logo-green-e0e983ec46.svg"/> &nbsp; &nbsp;  <Image alt="Ackee" height="80" src="https://avatars3.githubusercontent.com/u/1728223?s=400&v=4"/> &nbsp;
 <Image alt="Aerian Studios" height="80" src="https://www.aerian.com/img/c/aerian-logo.svg"/> &nbsp;<Image alt="Food and Agriculture Organization of the UN" height="100" src="https://avatars2.githubusercontent.com/u/38506195?s=200&v=4"/> <Image alt="Cape Cod Commision" height="70" src="http://www.capecodcommission.org/gfx/home-logo.jpg"/> &nbsp; <Image alt="Tweak Things" height="80" src="https://avatars3.githubusercontent.com/u/49718812?s=400&v=4"/> &nbsp; &nbsp; <Image alt="Crema" height="40" src="https://assets.website-files.com/5b6b50e79e9b6f5948395973/5d88f52b42420350d3e117d2_Asset%201.png"/> &nbsp; &nbsp; <Image alt="Cureon" height="120" src="http://cureon.de/resources/cureon_logo.png"/> &nbsp; &nbsp; <Image alt="Astrocoders" height="50" src="https://d33wubrfki0l68.cloudfront.net/b8f71088a0c9bc92d67476a361f35690d157d0e5/517c2/static/logo-c5d890fb431b53a7c61800feccd65ac2.png"/> &nbsp; &nbsp; <Image alt="Vega/IDL" height="60" src="http://vega.github.io/images/idl-logo.png"/> &nbsp; <Image alt="Sporty Spots" height="60" src="https://www.sportyspots.com/static/sportyspots.svg"/> &nbsp; &nbsp;<Image alt="Thrashplay" height="50" src="https://avatars1.githubusercontent.com/u/55868193?s=200&v=4"/> &nbsp;&nbsp;<Image alt="8base" height="80" src="https://avatars1.githubusercontent.com/u/28789399?s=200&v=4"/> &nbsp;&nbsp; <Image alt="Instamotionh" height="50" src="https://avatars1.githubusercontent.com/u/44466967?s=200&v=4"/>  <Image alt="Biotope" height="90" src="https://avatars1.githubusercontent.com/u/34653144?s=400&v=4"/> <Image alt="Frontend Labs" height="50" src="https://avatars1.githubusercontent.com/u/6691550?s=200&v=4"/>
<Image alt="Swydo" height="90" src="https://avatars1.githubusercontent.com/u/1563883?s=400&v=4"/> <Image alt="Gridsome" height="70" src="https://avatars0.githubusercontent.com/u/17981963?s=200&v=4"/> <Image alt="Rosem Laboratory" height="90" src="https://avatars2.githubusercontent.com/u/22129460?s=200&v=4"/><Image alt="Sheffield Hallam University" height="70" src="https://avatars1.githubusercontent.com/u/46559136?s=400&v=4"/>
<Image alt="Hackoregon" height="80" src="https://avatars3.githubusercontent.com/u/6343574?s=400&v=4"/> <Image alt="Chilly Design" height="50" src="https://avatars1.githubusercontent.com/u/13002395?s=200&v=4"/>

<Image alt="Scale Leap" height="50" src="https://avatars3.githubusercontent.com/u/41709180?s=200&v=4"/>

<Image alt="Chat Logs" height="50" src="https://avatars1.githubusercontent.com/u/37252774?s=200&v=4"/>

<Image alt="Stelace" height="70" src="https://avatars1.githubusercontent.com/u/32740360?s=400&v=4"/>

## Quick Start

Hygen can be used to supercharge your workflow with [Redux](http://www.hygen.io/redux), [React Native](http://www.hygen.io/react-native), [Express](http://www.hygen.io/express) and more, by allowing you avoid manual work and generate, add, inject and perform custom operations on your codebase.

If you're on macOS and have Homebrew:

```
$ brew tap jondot/tap
$ brew install hygen
```

If you have node.js installed, you can install globally with `npm` (or Yarn):

```
$ npm i -g hygen
```

If you like a no-strings-attached approach, you can use `npx` without installing globally:

```
$ npx hygen ...
```

For other platforms, see [releases](https://github.com/jondot/hygen/releases).

Initialize `hygen` in your project (do this once per project):

```
$ cd your-project
$ hygen init self
```

Build your first generator, called `mygen`:

```
$ hygen generator new mygen

Loaded templates: _templates
       added: _templates/mygen/new/hello.ejs.t
```

Now you can use it:

```
$ hygen mygen new

Loaded templates: _templates
       added: app/hello.js
```

You've generated content into the current working directory in `app/`. To see how the generator is built, look at `_templates` (which you should check-in to your project from now on, by the way).

You can build a generator that uses an interactive prompt to fill in a variable:

```
$ hygen generator with-prompt mygen

Loaded templates: _templates
       added: _templates/mygen/with-prompt/hello.ejs.t
       added: _templates/mygen/with-prompt/prompt.js
```

Done! Now let's use `mygen`:

```
$ hygen mygen with-prompt
? What's your message? hello

Loaded templates: _templates
       added: app/hello.js
```

## What's Next?

Go to the [documentation](http://www.hygen.io/quick-start) to get to know the rest of Hygen and generators.

If you're in a hurry:

* To learn how to edit generator templates, [look here](http://www.hygen.io/templates)
* To see how to use generators [look here](http://www.hygen.io/generators)
* Take a look at the [ecosystem](http://www.hygen.io/packages) and tooling built around Hygen.

## A Different Kind of a Generator

`hygen` is a scalable generator. It has developer and team ergonomics as first priority.

It avoids "blessed" or dedicated projects that codifies code generation, which before you know it, become a product you build, needs testing, CI, separate pull request reviews, and ultimately sucks up your time and becomes this super hated thing no one likes to touch anymore.

Plus, since they are not the product you are building they become notoriously hard to reason about.

## Scratch Your Own Itch

Because `hygen` templates live _in_ your project, it cuts the time from having an itch for generating code (Redux, anyone?) in your current
project to code generated with it and others benefiting from it.

### Template Locality

`hygen` picks up a local `_templates` folder
at any folder level of your project you're working from.

This is important because:

* Templates are project-local. A git clone of the project fetches all generators as well.
* Different generators can be tucked in different parts of the project, making it contextual.
* Template locality is scalable; different teams can maintain different generators.
* When you change your code, you can make changes in the template and pack in the same commit, to be reviewed and merged in the same PR (as opposed to installing different "plugins" or different templates from out-of-repo places).

And yet, if you don't like project-local templates:

* You can have a global `_templates` folder (maybe a central git repo you maintain?) by populating an environment variable `HYGEN_TMPLS`
* You can build a [custom generator](#build-your-own) of your own with `hygen` at its core, and pack your own templates with it.

### Folder Structure is Command Structure

The templates folder structure _maps directly_ to the command structure:

```
$ hygen worker new jobrunner
```

For this command, `hygen worker new` maps to `_templates/worker/new` and all files within `worker/new` are rendered.

Template parameters are given with `--flag VALUE`, as many as you'd like. In this example we've set a parameter named `name` to the value `jobrunner`.

### Subcommands

A subcommand is a file inside a your folder structure. So if the structure is this:

```
_templates/
    worker/
      new/
        index.html.ejs
        setup.html.ejs
```

And you only want `setup`, you can run:

```
$ hygen worker new:setup
```

You can also use the subcommand as a regular expression so, these will do the same:

```
$ hygen worker new:se
```

```
$ hygen worker new:se.*
```

### Frontmatter for Decluttering

Here's how a template looks like (in our example, `index.ejs.t`). Templates bodies are [ejs](https://github.com/tj/ejs):

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

The first part of the template is a [front matter](https://jekyllrb.com/docs/frontmatter/), idea borrowed from Markdown, this is the metadata part of a `hygen` template and is part of the reason of why your templates will feel more lightweight and flexible.

All frontmatter metadata _are also run through the template engine_ so feel free to use variables in the frontmatter as you wish.

There's one required metadata variable: `to`.
`to` points to where this file will be placed (folders are created as needed).

### Case changing

`hygen` provides ability to semantic case changing with `change-case` library, it's simple to use and very easy to understand.

There is a usecase for react based components generation:

```yaml
---
to: components/<%= name %>/index.jsx
---
import React from 'react'

export const <%= name %> = ({ children }) => (
  <div className="<%= h.changeCase.paramCase(name) %>">{children}</div>"
)
```

With name `HelloWorld` will be compiled to:

```js
import React from 'react'

export const HelloWorld = ({ children }) => (
  <div className="hello-world">{children}</div>"
)
```

You can see the full list [here](https://github.com/blakeembrey/change-case).

### Addition, Injection, and More

By default templates are 'added' to your project as a new target file, but you can also choose to inject a template _into_ an existing target file.

For this to work, you need to use `inject: true` with the accompanied inject-specific props.

```yaml
---
to: package.json
inject: true
after: dependencies
skip_if: react-native-fs
---
"react-native-fs":"*",
```

This template will add the `react-native-fs` dependency into a `package.json` file, but it will not add it twice (see `skip_if`).

Here are the available mutually-exclusive options for where to inject at:

* `before | after` - a regular expression / text to locate. The inject line will appear before or after the located line.
* `prepend | append` - add a line to start or end of file respectively.
* `line_at` - add a line at this exact line number.

You can guard against double injection:

* `skip_if` - a regular expression / text. If exists injection is skipped.

Also you can insert or remove empty line to injection body. That feature very useful if your editor or formatter automatically insert blank line at the end of file on save:

* `eof_last` - if falsy - trim blank line from the end of injection body, if truthy - insert it.

### Build Your Own

`hygen` is highly embeddable. You should be able to use it by simply listing it
as a dependency and having [this kind of workflow](src/bin.ts) in your binary.

```javascript
const { runner } = require('hygen')
const Logger = require('hygen/lib/logger')
const path = require('path')
const defaultTemplates = path.join(__dirname, 'templates')

runner(process.argv.slice(2), {
  templates: defaultTemplates,
  cwd: process.cwd(),
  logger: new Logger(console.log.bind(console)),
  createPrompter: () => require('enquirer'),
  exec: (action, body) => {
    const opts = body && body.length > 0 ? { input: body } : {}
    return require('execa').shell(action, opts)
  },
  debug: !!process.env.DEBUG
})
```

# Development

The Hygen codebase has a functional style where possible. This is because naturally, it
feeds parameters and spits out files. Try to keep it that way.

Running `hygen` locally, rigged to your current codebase (note the additional `--` to allow passing flags)

```
$ yarn hygen -- mailer new foobar
```

Running tests in watch mode:

```
$ yarn watch
```

## Metaverse Testing

The easiest way to make an impact is to use the built-in [`metaverse`](src/__tests__/metaverse) tests suite, and then add the tests [here](src/__tests__/metaverse.spec.js).

The idea here is to copy templates from any project that use `hygen` and to test that it works at all times. This keeps tabs on the hygen universe / ecosystem (nicknamed metaverse) and makes sure this test suite breaks before `hygen` clients break.

## Internal Testing

## Start Up Speed Testing

Many generators become painfully slow to use as the thing you want to generate grow (because, real life),

This is why `hygen` takes speed as a first class citizen, and sports a dedicated start-up timing suite:

```
$ yarn test:require
```

In addition, thought is given to which dependencies to take in, how their file structure fan out and what kind of disk access (due to `require`) would `hygen` ultimately have when we run it. This is recorded with every test run.

Bundling a single file was evaluated (and the infrastructure is still there, using `webpack`) and wasn't faster than what we have right now.

# Contributing

Fork, implement, add tests, pull request, get my everlasting thanks and a respectable place here :).

### Thanks:

To all [Contributors](https://github.com/jondot/hygen/graphs/contributors) - you make this happen, thanks!

# Copyright

Copyright (c) 2018 [Dotan Nahum](http://gplus.to/dotan) [@jondot](http://twitter.com/jondot). See [LICENSE](LICENSE.txt) for further details.

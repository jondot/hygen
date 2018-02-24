---
title: Packages
doc: 1
section: 2
category: "tech"
type: "doc"
---

Sharing generators cross-projects and cross-teams can be done simply by copying or any custom tooling your teams come up with that perfectly fits your workflow.

The `hygen-add` tool offers a streamlined way to do this by introducing _Packages_. Packages are a compiled set of generators which are published as a node module that you can install and share with others.

## Popular Packages

* [hygen-cra (create-react-app)](https://github.com/jondot/hygen-CRA) - generate a full set of component, storybook and test for your [Create React App](https://github.com/facebook/create-react-app) project.

## Installing a Package

First, you need to install the `hygen-add` tool, it's one of the tools in the `hygen` toolbelt.

```bash
$ yarn global add hygen-add
```

Now pick [a published module](https://www.npmjs.com/search?q=hygen-) on `npm` and install it. For a module called `hygen-acme-generators`, run this, without the prefix `hygen-`:

```bash
$ hygen-add acme-generators
```

This installs the `acme-generators` package with the embedded `yarn` so it's versioned and locked, and adds the generators to your current project. Technically, it will _copy_ the generators to your local `_templates` directory, because copying is more resilient and robust rather than referncing something that can change unexpectedly.

Once that's done, you can remove `acme-generators` using `yarn`, or leave it if you'd like to sync your templates once in a while.

## Installing from Github

`hygen-add` supports installing from Github, in the same way `yarn` supports it because it uses `yarn` under the hood. It will try to infer the package name from the Github repo URL.

Running this:

```bash
$ hygen-add https://github.com/acme/acme-generators
```

Will install the package `acme-generators`. The package name `acme-generators` was parsed out of the Github URL.

If for some reason your Github URL doesn't reveal anything about the package name, you can manually specify the package name (remember: the package name is the `name` property in the package project's `package.json` file).

```bash
$ hygen-add https://github.com/acme/archive --name acme-generators
```

## Name Clashes

If you want to install a `react` package from both `acme` and `awesome`, you can prefix one of those, or both, to avoid name clashes:

```bash
$ hygen-add acme-react
$ hygen-add awesome-react --prefix awsm
```

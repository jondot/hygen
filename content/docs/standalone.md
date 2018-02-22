---
title: Standalone
doc: 2
section: 2
category: "tech"
type: "doc"
---

If you don't have Node.js installed you can install the `hygen` binary in standalone mode. Depending on your operating system, you have a few options.

## MacOS

You can install via Homebrew:

```
$ brew tap jondot/tap
$ brew install hygen
```

## Linux, Windows, MacOS (Non-homebrew)

You can download a binary for your operating system [on the Github releases page](https://github.com/jondot/hygen/releases). Binaries are updated and pushed automatically with every new version.

After downloading the tarball, place it in your preferred operating system `bin` path.

## Why Standalone?

There are a few reasons to want to run `hygen` as standalone:

* You're not familiar with Node.js or don't want to have it installed.
* You prefer a global binary to avoid installing the same binary over and over.
* You're packing `hygen` into your own software, Docker image, or re-distributing it.
* You're building tooling _over_ `hygen` and need a maleable binary to execute.
* The standalone package is a little bit faster (because it snapshots code). You want that extra speed.

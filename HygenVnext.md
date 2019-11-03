# Notes about a future version of Hygen

An update for hygen.js that expands functionality, composition, and
 extensibility .

## Goals
* Streamline and standardize into a pipline
* Make the purposes of .hygen.js, index.js, prompt.js clearer
* Make sharing of helpers, arguments, and data between actions and generators
 easier
* Main program flow is Promise based.
* Apply middleware pattern to data flow, each section of system adds, removes
 or chages data from a master structure which is passed through the system

 
## Config Object
 The Config Object is passed through the whole sytem, carrying data and
functions with it.



```js
const config = {
  "env": {/* contains data about environment, config, Io methods */},
  "generator": {/* contains information about the generate/action/templates */},
  "io": {/* contains functions and modules to interact with the file system */ },
  "helpers": {/* contains functions to be used within templates */},
  "params": {/* data for templates including user input */},
  "render": {/* contains functions for rendering templates for various directives */},
  "tools": {/* contains functions to be used by other parts of the system, and rendering */},
}
```

### `config.env`
Data from the environment, directory, configuration files and IO methods.  These
will largely be unchanging, but can be tweaked for testing or other purposes.
```js
config.env = {
  cwd: process.cwd(),
  debug: !!process.env.HYGEN_DEBUG || !!process.env.DEBUG,
  templates: process.env.HYGEN_TMPLS || '_templates',
  configFile: process.env.HYGEN_CONFIG || '.hygen.js',
  ignoreFile: process.env.HYGEN_IGNORE || '.hygenignore',
  paramsFile: process.env.HYGEN_PARAMS || ['index.js','prompt.js'],

  logger: new Logger((...msg) => console.log(...msg)),
  exec: shellFunction, /* deprecated, duplicated to io */
  prompter: createPrompter,

  io: {
    exec: shellFunction,
    load: asyncRequire,
    none: noop,
    configResolver,
    generatorResolver,
  }  
}
```

### `config.tools`
Functions for use in rendering, params and prompt middleware and plugins
```js
config.tools = {
  // prompter: createPrompter // prolly should be here but the IO bit can be argued,
  render: {
    to: toRenderer, /* unlessExists */
    inject: injectRenderer, /* including before, after, skip_if, prepend, append, at_line */
    shell: shellRenderer,
    message: messageRenderer,
  }
  /* also user defined renderers and tools */
}
```

### `config.helpers`
Helpers for templates available under `h.`.
```js
config.helpers = {
  capitalize: capFn,
  inflect,
  changeCase,
  pathMaker, /* get output paths with ease */
  nameMaker, /* get variations on name and constuct variations easily */
}
```

### `config.params`
Data gathered via arguments in argv, `index.js`. and `params.js` output.
```js
config.params = {
  actionFolder: '/home/ridcully/code/project/_templates/gen/act',
  action: 'act',
  generator: 'gen',
  subaction: 'story',
  cwd: '/home/ridcully/code/project/',
  templates: '/home/ridcully/code/project/_templates',
  name: 'UnseenUniversity'
  /* rest of cli options, env variables starting with HYGEN_, prompt and params results */
}
```

### `config.generator`
Information and data from chosen generator.
```js
config.generator = {
  generator: 'gen',
  action: 'act',
  subaction: null,
  name: 'UnseenUniversity',
  templates: [/* all templates for action */]
}
```

## Resolver
A resolver if a function that takes a config and returns a promise to return a config
```typescript
const resolver: HygenResolver = (config) => Promise.resolve(config)
```

## Program Flow

0. `hygen gen action UnseenUniversity --librarian=orangatan`
1. run `yargs(argv)` and build first pass of arguments
2. build config.env
3. In parallel `Promise.all(...)`
  a. using config.env.configFile, search up directory tree until a configFile is found and loaded
  b. using config.env.templates, config.env.ignoreFile to get list of generators/actions/templates
4. merge configFile with config.
  a. if configFile has a tools.yargs key, rerun yargs with additional config
5. In parallel
  a. find, load and merge paramFiles from `['_templates','_templates/gen','_templates/gen/act']` 
  b. load each template, and store.
7. Run prompt middleware
  a. if paramFile has a tools.yargs key, rerun yargs with additional config
8. Run params middleware
  a. if paramFile has a tools.yargs key, rerun yargs with additional config
9. In parallel for each templates
  a. find renderer's needed from template directives
  b. prepare template context
  c. render output

## Other standardization

### Promises
A consistent use of promises makes chaining parts of the program flow much easier, and the
 advantages for async operations and error handling should be obvious.
 
### Yargs
Expand the use of yargs makes a number of things easier and nicer.  The ability to define options
and commands improves the utility of the help function, allow shell completion, and allow users
to define command modules for their own generators and templates

### Directives
A Directive is a specific way to render a file. I'd like to change the frontmatter structure to
provide a clearer separation of rendering and template data.  Deprecation city though.
```yaml
---
to: filename
to:
  to: path/to/write/file.to
  unless_exists: true

inject:
  to: path/to/inject/in.to
  append: true 
# or prepend,before,after,at_line
  skip_if: propTypes

message: Some Message
# or with keys, call logger with that key and pass message
message:
  trace: Hassle the Bursar # logger.trace('Hassle the Bursar')

# non-directive data, merged into params
params:
  pastimes: Hunting
  condiment: Wow-Wow Sauce
```

This also allows replacing existing directives as well as adding your own. 

### Multiple config, templates, params files
There are a few challenges with this, but I don't think they are insurmountable

The 2 main challenges are order and naming.  Order reflects the priority of which configFile gets
the first, or final say. While naming presents problems where there are different instances of 
things for the same key.

Order is pretty solvable with a basic rule: The file furthest away from `env.cwd` is the first
applies, while the last one applied is the one closest to cwd. This allows the
more specifc configFiles to have the last say over more general ones. This problem affects both
configFiles and template generators equally.

Naming is a much larger problem for templates.  The problem appears when multiple template 
directories contain a generator or a generator/action name is defined in each
```
~/code/project/_templates/types
~/code/_templates/types

~/code/project/_templates/types/create
~/code/_templates/types/create
~/code/_templates/types/staff

$ hygen g types create bathtub
# probably should run ~/code/project/_templates/types/create
$ hygen g types staff stibbons --no-funding
# should this run ~/code/_templates/types/staff?
# do duplicates matter at the generator or generator/action level  
``` 
  
For configFiles, my inclination is to allow multiple config files, using general -> specific 
ordering.

For templates, the order will be set by the order of `HYGEN_TMPLS`
```bash
export HYGEN_CONFIG=_templates:~/code/_templates:~/.local/share/hygen-templates 
```
The templates will be considered at the generator/action level so that the example above would
 work.  Warnings will be given when duplicate generators or generator/actions are used.
 
 An override syntax might be possible.
 `$ hygen types create[1] wizard` could get the 2nd action found not the first.
 

# Version 5
An update for hygen.js that expands functionality and modularity.

## Goals
  * streamline and standardize into a pipeline
  * improve configuration
  * standardize config
  * lifecycle hooks
  * main process the result of a series of resolvers
  * supporting behavior the result of a series of modules
  * standardize fully to flow (or typescript?)
  * use promises/async/await throughout
  * flow same data through entire process.
  * add additional layers of generator and action specific config

## Config Object
The config object will be passed from hook to module to resolver, building it
, changing it, adding tools...
 
As such it needs a standard set of keys and instructions on how to merge two
 together.  Additionally, that makes it possible to use multiple .hygen.js
  files in your projects.
```javascript
/* REPLACE = older value replaces newer */
/* SHALLOW = merging objects ({...one, ...two}), subObjects replaced */
/* JOIN = when merging, the object keys and array values are SHALLOW */
/*   in all cases, the data can be manipulated however you like, but you could break some things */
const config = {
  /*REPLACE data about runtime environment */
  env: {argv,cwd,templatesDir,configFilename},

  /*REPLACE logger to be used throughout */
  logger: mkLogger(),

  /*REPLACE metadata about config file used */
  configFile: {globalPaths: [], localPaths: []},

  /*JOIN modules to use */
  modules: [],
  /*JOIN localConfigFiles */
  localConfigFilenames: [],
  /*JOIN directives */
  directives: [],

  /*JOIN metadata about generator, actions, subactions, files, ignores... */
  generator: {name, action, subaction,
              templates: [],ignored: [], paramFiles: []},

  /*SHALLOW helper functions and constants to be made available in templates */
  helpers: {},
  /*SHALLOW helper functions and constants meant for non template usage */
  tools: {exec,createPrompter,path,io,fs},

  /*SHALLOW parsed argv */
  /* the yargsOptionResolver resolves global options like --help, --trace, --dry-run */
  /* the yargsParamsResolver resolves for action specific values like --name */
  params: {},
  options: {},

  /*JOIN lifecycle hooks */
  hooks: {postConfig: [], preTemplates: [], ...},
  /*JOIN path parts to be ignored in generator discovery */
  ignored: { generators: [], actions: [], files: [], patterns: [] },
}
```
### Promises everywhere
promises will be used to chain resolvers and hook

## Resolvers
A resolver receives and returns a config object, and in between accomplishes
 one of the major tasks of hygen.

#### Config
The config Resolver sets the default config, then crawls from `cwd` to
 `/` seeking `process.env.HYGEN_CONFIG_FILE || '.hygen.js` files, and reading
  the ones it does find.
 
###### Hooks
* postConfig - after all config files read and merged
  * this is the first hook run

#### Module
The module resolve find and loads all modules defined in `config.modules`
each module is merged with config.

Modules may be defined in a few ways depending on the type of the module
* strings will be used as the name of a built in module and loaded internally
* functions will be executed and result merged with config
* objects will be merged with config

###### Hooks
* preModule - before the array of modules is read
* eachModule - after each module is read
* postModule - after all of the modules are loaded

#### YargsOptions
Parsing argv for options, and using hooks to provide a way to chain call and
use more of the power of `yargs-parser`.  Result is merged specifically into 
`config.options`

###### Hooks 
* preYargsOptionsParser
* yargsOptionParsers for adding parsers before parsing
* postYargsOptionsParser

#### Generator
Find the correct directory for the given generator and action, and create a 
metadata object about it. The data in `config.ignored` is used to skip
 specific directories and files.
 
Any paramFiles found between `_templates` and `_templates/gen/action` will be
 read and merged. 
```generator: {name, action, subaction,templates: [],ignored: [], paramFiles: []}```

###### Hooks
* preGenerator
* missingGenerator
* postGenerator

#### YargsParams
As yargsOptions, but run after the generator has loaded. The result is merged
 specifically into `config.params`

###### Hooks
* preParamsParsers
* yargsParamsParsers for adding parsers before parsing
* postParamsParsers

#### Params
Processing the params is only a matter of running all of the hooks.

###### Hooks 
* preParams
* eachParams
* params
* postParams

#### templates
Find and load all of the necessary templates.

###### Hooks
* preTemplates
* eachTemplate
* missingTemplates
* postTemplates

#### directives
Directives define specific render actions for each template file. The
frontmatter of each template is parsed for the various directives available
(as below), and RenderActions are created. Any keys found in the frontmatter
not related to a directive will be added to the context for the template
generation.

Additional directives could be added.

###### current directives
* inject
* message
* sh
* writeFile

###### Hooks
* preDirectives
* eachDirective
* failedDirective
* postDirectives

#### render - render templates
Loop through all RenderActions and execute each one.

###### Hooks
* preRender
* eachRender
* failedRender
* postRender

## Modules
A module is a packaged set of helpers, tools, hooks, and ignored. A module is
 just another config file, merged into the rest.

* logging - an advanced logger that respect `cli --quiet, --trace, --logLevel 4`
* help - a system wide help system 
* pathTo - path creation utility
* nameMaker - a name mutation utility
* jsonSource - read a json file and add to config, also yml, csv...
* prompt - interactive prompt system

#### Promises
All resolvers and hooks are expected to return either a config object or a
promise to deliver one.  All resolvers and hooks are then chained for
execution.
  

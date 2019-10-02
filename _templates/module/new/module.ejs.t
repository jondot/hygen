---
to: <%- [process.cwd(), 'v5', 'module', `${name}.ts` %>
---
import { HygenConfig } from './hygen'

const <%- ${name}Module %>: HygenConfig = {
  configFile: {localPaths: []},
  directives: [],
  helpers: {},
  hooks: {postModule: [], preParams: []},
  ignored: { generators: [], actions: [], files: [], patterns: [] },
  localConfigFilenames: [],
  modules: ['logging','help'],
  options: {},
  params: {},
  templates: {},
  tools: {},
}

export default <%- `${name}Resolver` %>

---
to: <%- [process.cwd(),'v5', 'resolvers', `${name}.ts` %>
---
import {HygenConfig} from './hygen'
export const <%- ${name}Resolver %> = (config: HygenConfig): Promise<HygenConfig> => {

  return config
}

export default <%- ${name}Resolver %>

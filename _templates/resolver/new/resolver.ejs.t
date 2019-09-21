---
to: <%- srcPath('resolvers', `${name}.ts`) %>
---
import { HygenConfig } from '../hygen'

export const <%- resolverName %> = (config: HygenConfig): Promise<HygenConfig> => {

  return Promise.resolve(config)
}

export default <%- resolverName %>

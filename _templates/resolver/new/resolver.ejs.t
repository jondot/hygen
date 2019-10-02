---
to: <%- resolverPath %>
---
import { HygenConfig, HygenResolver } from '../hygen'
import { chainPromise } from '../utils'

export const <%- resolverName %> = (config: HygenConfig): Promise<HygenConfig> => {
  // resolve pre<%- Name %> hooks

  // resolve post<%- Name %> hooks
  return Promise.resolve(config)
}

const resolver: HygenResolver = {
  resolver: <%- resolverName %>,
  name: '<%- Name%> Resolver',
  hooks: ['pre<%- Name %>', 'post<%- Name %>'],
}

export default resolver

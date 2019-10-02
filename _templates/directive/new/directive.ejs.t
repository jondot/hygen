---
to: <%- [process.cwd(), 'v5', 'directives', `${name}.ts`].join('/') %>
---
import { HygenConfig } from './hygen'


export const <%- `${name}Directive` %> = (config: HygenConfig): Promise<HygenConfig> => {
  const {frontMatter} = config
  // find keys from frontMatter that matter, return if you don't
  // perform appropriate actions based on data

  return config
}

export default <%- ${name}Directive %>

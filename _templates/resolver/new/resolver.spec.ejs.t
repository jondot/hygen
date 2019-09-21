---
to: <%- testPath('resolvers', `${name}.spec.ts`) %>
---
import <%- resolverName %> from '<%- srcPath('resolvers',`${name}`) %>'

describe('<%- resolverName %>(hygenConfig)', () => {
  it('should be a function', () => {
    expect(typeof <%- resolverName %>).toEqual('function')
  });
});

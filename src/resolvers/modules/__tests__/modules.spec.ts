import modulesResolver from './src/v5/resolvers/modules'

describe('modulesResolver(hygenConfig)', () => {
  it('should be a function', () => {
    expect(typeof modulesResolver).toEqual('function')
  });
});

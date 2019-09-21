import configResolver from '/home/scottp/code/workspace/hygen/src/v5/resolvers/config'

describe('configResolver(hygenConfig)', () => {
  it('should be a function', () => {
    expect(typeof configResolver).toEqual('function')
  });
});

import { resolveEnv } from './resolvers/env'

resolveEnv({}).then(env => {console.log(env);  return env})


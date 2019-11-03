import { fetchEnv } from './resolvers/config/env'
import path from 'path'

const env = fetchEnv({})

const result = env.io.reversePathsToWalk({ folders: ['~/.hygen.conf', '~/hygen.conf'], path })

console.log('try:', result)
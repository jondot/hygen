#!/usr/bin/env node
import {mkLogger} from './utils'
const logger = mkLogger({})
console.log('====')
console.table(logger)
console.log('====')

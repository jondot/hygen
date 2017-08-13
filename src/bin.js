#!/usr/bin/env node

const path = require('path')
const { runner } = require('./index')
const defaultTemplates = path.join(__dirname, '../src/templates')

runner(defaultTemplates)

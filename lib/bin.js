#!/usr/bin/env node
'use strict';

var path = require('path');

var _require = require('./index'),
    runner = _require.runner;

var defaultTemplates = path.join(__dirname, '../src/templates');

runner(defaultTemplates);
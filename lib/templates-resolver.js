'use strict';

var L = require('lodash');
var fs = require('fs-extra');
var path = require('path');
module.exports = function (cwd, defaultTemplates) {
  return L.find([path.join(cwd, process.env.HYGEN_TMPLS || '_templates'), path.join(cwd, '_templates')], function (_) {
    return fs.existsSync(_);
  }) || defaultTemplates;
};
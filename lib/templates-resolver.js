function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const L = require('lodash');

const fs = require('fs-extra');

const path = require('path');

module.exports = config => {
  const cwd = config.cwd,
        templates = config.templates;
  const resolvedTemplates = L.find([// $FlowFixMe
  process.env.HYGEN_TMPLS, path.join(cwd, '_templates')], _ => fs.existsSync(_)) || templates;
  return _extends({}, config, {
    templates: resolvedTemplates
  });
};
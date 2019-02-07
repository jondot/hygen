const resolve = ({ attributes }, args = {}, config = {}) => {
  const ops = [];
  if (attributes.to && !attributes.inject) {
    const add = require("./add");
    ops.push(add);
  }
  if (attributes.to && attributes.inject) {
    const inject = require("./inject");
    ops.push(inject);
  }
  if (attributes.sh) {
    const shell = require("./shell");
    ops.push(shell);
  }

  // plugins will be called with action,args,config arguments
  //   config.logger
  //   config.exec
  //   createResult
  if (config.plugins && config.plugins.length > 0) {
    Object.entries(config.plugins).forEach((key, plugin) => {
      if (attributes[key]) ops.push(plugin);
    });
  }

  // scripts called with action,args,config arguments
  //         returns a string containing shell command
  //         string is executed
  //   name used in createResult and logger will be key.
  if (config.scripts && config.scripts.length > 0) {
    const wrapper = require("./wrap-script");
    Object.entries(config.scripts).forEach((key, plugin) => {
      if (attributes[key]) ops.push(wrapper(key, plugin));
    });
  }

  return ops;
};
module.exports = resolve;

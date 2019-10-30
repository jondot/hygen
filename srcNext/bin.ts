import { runner } from './index'

// initialConfig can be used to set env, tools instead of useing defaults
runner({}).then(final => console.debug('final config', final))

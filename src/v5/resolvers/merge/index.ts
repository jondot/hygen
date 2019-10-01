import { HygenConfig, HygenResolver } from '../hygen'
import { chainPromise } from '../utils'

// Merge 2 objects according to these rules.
//   1. Any key in fresh, not in stale is added to final
//   2. if fresh value is array,
// @param {object} stale object which is being changed
// @param {object} fresh object to be merged
// @return {object} result of merge rules on stale and fresh
export const mergeHygenConfig = (stale: object, fresh: object, deeper = false): HygenConfig => {
  // TODO decide upon which set of keys to use for loops below
  Object.entries(fresh).reduce((final, [key, value]) => {
    if (!final[key]) {
      final[key] = value
    } else if (Array.isArray(value)) {
      final[key] = [...final[key], ...fresh[key]]
    } else if (typeof value === 'function') {
      final[key] = fresh[key](final[key])
    } else if (typeof value === 'object' && deeper) {
      final[key] = mergeHygenConfig(final, fresh, false)
    } else {
      final[key] = value
    }
    return final
  }, {...stale})

  // only first and second levels are considered for merge
  // config.filenames ok.  generator.action.defaults no.
  //
  // booleans, numbers, strings are replaced
  // arrays are concat [...stale, ...fresh]
  // functions are executed - final.params = fresh.params(stale.params)
  // objects merged 1 level deep and rerun this

}
!
const resolver: HygenResolver = {
  resolver: mergeResolver,
  name: 'Merge Resolver',
  hooks: ['preMerge', 'postMerge'],
}

export default resolver

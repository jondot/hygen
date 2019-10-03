// import { HygenConfig } from '../hygen'

// Merge 2 objects according to these rules.
//   1. Any key in fresh, not in stale is added to final
//   2. if fresh value is array,
// @param {object} stale object which is being changed
// @param {object} fresh object to be merged
// @return {object} result of merge rules on stale and fresh
export const mergeConfig = (stale, fresh, deeper= true) =>
  Object.entries(fresh).reduce(
    (final, [key, value]) => {
      if (!final[key]) {
        /* when the fresh key does not exist in stale */
        final[key] = value
      } else if (Array.isArray(value) && Array.isArray(final[key])) {
        /* when both values are arrays */
        final[key] = [...final[key], ...fresh[key]]
      } else if (typeof value === 'function') {
        /* when fresh is a function */
        final[key] = value(final[key])
      } else if (
        deeper &&
        typeof value === 'object' &&
        typeof final[key] === 'object'
      ) {
        /* when both values are objects */
        final[key] = mergeConfig(final[key], value, false)
      } else {
        /* in every other case */
        final[key] = value
      }
      // console.log('mergeConfig', final)
      if (final.logger && deeper) {
        const c = {
          stale: Object.keys(stale).length,
          fresh: Object.keys(fresh).length,
          final: Object.keys(final).length,
        }
        final.logger.trace('mergeConfig(stale, fresh, deeper = true) ===', final)
        final.logger.debug(`  results: stale: ${c.stale}, fresh: ${c.fresh}, final: ${c.final} `)
      }
      return final
    },
    { ...stale },
  )

export default mergeConfig

import { ActionResult } from '../types'
import createResult from './result'

const notEmpty = x => x && x.length > 0
const echo = async (
  { attributes: { echo }},
  _args:any,
  { logger },
): Promise<ActionResult> => {
  const result = createResult('shell', echo)
  if (notEmpty(echo)) {
    logger.colorful(echo)
    return result('executed')
  }
  return result('ignored')
}

export default echo

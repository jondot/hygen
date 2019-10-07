import { ExecFn } from '../hygen'

export const exec: ExecFn = (action, body) => {
  const opts = body && body.length > 0 ? { input: body } : {}
  return require('execa').shell(action, opts)
}

// @flow
export type Logger = {
  ok: (msg: string) => void,
  notice: (msg: string) => void,
  warn: (msg: string) => void,
  err: (msg: string) => void,
  colorful: (msg: string) => void
}
export type RenderedAction = {
  file: string,
  attributes: Object,
  body: string
}
export type RunnerConfig = {
  exec: (sh: string, body: string) => void,
  templates: string,
  cwd: string,
  logger: Logger,
  debug: boolean
}

// @flow
export type Logger = {
  +log: (...data: any) => void,
  +error: (...data: any) => void
}
export type RenderedAction = {
  file: string,
  attributes: any,
  body: string
}
export type RunnerConfig = {
  templates: string,
  cwd: string,
  logger: Logger,
  debug: boolean
}

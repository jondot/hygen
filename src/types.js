// @flow
export type Logger = { +log: (...data: any) => void }
export type RenderedAction = {
  file: string,
  attributes: any,
  body: string
}

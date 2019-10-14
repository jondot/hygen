import {Parser} from 'yargs-parser'

export declare type YargsBuilder = (p: Parser) => Parser
exoport declare enum YargsType {
  'boolean','number','string',''
}
export declare interface YargsConfig {
  parser: Parser
  key: string
  description: string
  builder: YargsBuilder
}

export type YargsValue = boolean | number | string | Array<boolean | number | string>

export declare interface YargsResult {
  [s: string]: YargsValue
}
export declare interface YargsOption {
  alias?: string
  default?: YargsValue
  describe: string
  type:
}
export declare interface YargsOptions {
  [s: string]: YargsOption
}

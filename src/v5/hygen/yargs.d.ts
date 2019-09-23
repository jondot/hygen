import {Parser} from 'yargs-parser'

export declare type YargsBuilder = (Parser) => Parser

export declare interface YargsConfig {
  parser: Parser
  key: string
  description: string
  builder: YargsBuilder

}


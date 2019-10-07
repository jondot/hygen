import { EnvConfig, HygenConfig } from './config'
import { StringMap } from './types'

export interface ChalkMapping {
  [S: string]: LogMessage
}
export declare type LogMessage = (...msg: any[]) => void

export declare class Logger {
  constructor(log: LogMessage, env: EnvConfig, mapping: StringMap)
  trace: LogMessage
  debug: LogMessage
  info: LogMessage
  warn: LogMessage
  error: LogMessage
  err: LogMessage
  log: LogMessage // dark white or light black
  notice: LogMessage // gold ish
  ok: LogMessage // green ish
  setLevelFrom: (params: LogYargs) => void
  [s: string]: LogMessage,
}

export declare interface LogYargs {
  logLevel?: number

  silent?: string
  quiet?: string
  warn?: string
  debug?: string
  trace?: string

  /* pass `--log` to format output for logging? */
  // log?: string
}

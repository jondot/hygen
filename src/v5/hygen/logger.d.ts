import { EnvConfig, HygenConfig } from './config'

export declare type LogMessage = (...msg: any[]) => void

export declare class Logger {
  constructor(log: LogMessage, env: EnvConfig, mapping: StringMap)

  log: LogMessage
  colorful: LogMessage
  trace: LogMessage
  debug: LogMessage
  notice: LogMessage
  ok: LogMessage
  info: LogMessage
  warn: LogMessage
  error: LogMessage
}

export declare interface LogYargs {
  logLevel?: number

  s?: string
  silent?: string
  q?: string
  quiet?: string
  warn?: string
  debug?: string
  trace?: string
}


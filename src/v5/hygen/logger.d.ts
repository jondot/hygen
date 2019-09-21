import {EnvConfig} from './config'

export declare function LogMessage = (string[]) => void
export declare class LoggerClass {
  constructor(LogMessage, EnvConfig, object)

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

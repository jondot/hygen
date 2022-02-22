import { Logger } from '../types'
declare const VERSION = '6.1.1'
declare const availableActions: (templates: string) => {}
declare const printHelp: (templates: string, logger: Logger) => void
export { availableActions, printHelp, VERSION }

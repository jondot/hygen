import { Logger } from './types';
declare const VERSION: any;
declare const availableActions: (templates: string) => {};
declare const printHelp: (templates: string, logger: Logger) => void;
export { availableActions, printHelp, VERSION };

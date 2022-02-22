import { Logger } from './types';
import { version as VERSION } from '../package.json';
declare const availableActions: (templates: string) => {};
declare const printHelp: (templates: string, logger: Logger) => void;
export { availableActions, printHelp, VERSION };

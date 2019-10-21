import { RenderedAction, RunnerConfig } from '../types';
declare const injectOp: (action: RenderedAction, args: any, { logger, cwd }: RunnerConfig) => Promise<any>;
export default injectOp;

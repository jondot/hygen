import { ActionResult, RenderedAction, RunnerConfig } from '../types';
declare const injectOp: (action: RenderedAction, args: any, { logger, cwd }: RunnerConfig) => Promise<ActionResult>;
export default injectOp;

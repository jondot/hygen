import { ActionResult, RunnerConfig, RenderedAction } from '../types';
declare const add: (action: RenderedAction, args: any, { logger, cwd, createPrompter }: RunnerConfig) => Promise<ActionResult>;
export default add;

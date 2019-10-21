import { RunnerConfig, RenderedAction } from '../types';
declare const add: (action: RenderedAction, args: any, { logger, cwd, createPrompter }: RunnerConfig) => Promise<any>;
export default add;

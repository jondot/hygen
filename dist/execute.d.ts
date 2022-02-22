import { RunnerConfig, RenderedAction } from './types';
declare const execute: (renderedActions: RenderedAction[], args: any, config: RunnerConfig) => Promise<any[]>;
export default execute;

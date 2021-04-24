import { RunnerConfig, RenderedAction, ActionResult } from './types';
declare const execute: (renderedActions: RenderedAction[], args: any, config: RunnerConfig) => Promise<ActionResult[]>;
export default execute;

import { RenderedAction, RunnerConfig } from './types';
declare const render: (args: any, config: RunnerConfig) => Promise<RenderedAction[]>;
export default render;

import { RunnerConfig, RenderedAction } from '../types';
declare const renderFiles: (files: any[], args: any, config: RunnerConfig) => Promise<RenderedAction[]>;
export default renderFiles;

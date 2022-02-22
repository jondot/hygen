import { RunnerConfig, ParamsResult } from './types';
declare const params: ({ templates, createPrompter }: RunnerConfig, externalArgv: string[]) => Promise<ParamsResult>;
export default params;

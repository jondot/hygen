import { RunnerConfig } from './types';
declare const params: ({ templates, createPrompter }: RunnerConfig, externalArgv: string[]) => Promise<any>;
export default params;

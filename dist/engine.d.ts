import { RunnerConfig } from './types';
declare const engine: (argv: string[], config: RunnerConfig) => Promise<any[]>;
export default engine;

import { ActionResult, RunnerConfig } from './types';
declare const engine: (argv: string[], config: RunnerConfig) => Promise<ActionResult[]>;
export default engine;

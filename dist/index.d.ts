import { RunnerResult, RunnerConfig } from './types';
import resolve from './config-resolver';
import Logger from './logger';
import engine from './engine';
import { printHelp, availableActions, VERSION } from './help';
declare const runner: (argv: string[], config: RunnerConfig) => Promise<RunnerResult>;
export { runner, engine, resolve, printHelp, availableActions, Logger, VERSION };

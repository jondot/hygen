import type { ActionResult, ResolvedRunnerConfig } from './types';
declare class ShowHelpError extends Error {
    constructor(message: string);
}
declare const engine: (argv: string[], config: ResolvedRunnerConfig) => Promise<ActionResult[]>;
export { ShowHelpError };
export default engine;
//# sourceMappingURL=engine.d.ts.map
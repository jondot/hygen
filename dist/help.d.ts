import type { Logger, ResolvedRunnerConfig, ResolvedTemplatePathConfig } from './types';
import { ConflictResolutionStrategy } from './types';
declare const VERSION: any;
declare const availableActions: (templates: ResolvedTemplatePathConfig[], conflictStrategy?: ConflictResolutionStrategy) => Record<string, string[]>;
declare const printHelp: (config: ResolvedRunnerConfig, logger: Logger) => void;
export { availableActions, printHelp, VERSION };
//# sourceMappingURL=help.d.ts.map
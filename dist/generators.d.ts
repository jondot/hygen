import type { GeneratorInfo, ResolvedTemplatePathConfig } from './types';
import { ConflictResolutionStrategy } from './types';
export declare const actionKeyFor: (generator: string, action: string) => string;
export declare function loadGenerators(templates: ResolvedTemplatePathConfig[], conflictStrategy: ConflictResolutionStrategy): {
    generators: GeneratorInfo[];
    actionsMap: Map<string, GeneratorInfo>;
};
//# sourceMappingURL=generators.d.ts.map
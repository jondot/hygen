import { HygenBuildConfig, HygenResolver } from '../types';
export declare const noopResolver: HygenResolver;
export declare const mergeConfig: (config: HygenBuildConfig, mod: HygenBuildConfig) => HygenBuildConfig;
export declare const resolveCustomYargs: (arr: any) => (yargs: any) => any;
export declare const resolveArray: (field: string) => HygenResolver;

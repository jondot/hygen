import { ResolverIO } from './types';
declare const reversePathsToWalk: ({ folder, path }: {
    folder: any;
    path: any;
}) => any;
declare const configLookup: (file: string, folder: string, path?: any) => any;
declare class ConfigResolver {
    configFile: string;
    io: ResolverIO;
    constructor(configFile: string, io: ResolverIO);
    resolve(from: string): Promise<Record<string, any>>;
}
export { configLookup, ConfigResolver, reversePathsToWalk };

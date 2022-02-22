/// <reference types="node" />
import changeCase from 'change-case';
import path from 'path';
declare const helpers: {
    capitalize(str: any): string;
    inflection: any;
    changeCase: typeof changeCase;
    path: path.PlatformPath;
};
export default helpers;

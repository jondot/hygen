import { Prompter } from './types';
declare const prompt: <Q, T>(createPrompter: () => Prompter<Q, T>, actionfolder: string, args: Record<string, any>) => Promise<object | T>;
export default prompt;

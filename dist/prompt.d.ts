import { Prompter } from './types';
declare const prompt: (createPrompter: () => Prompter, actionfolder: string, args: Record<string, any>) => Promise<any>;
export default prompt;

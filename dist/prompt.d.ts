import type { Prompter } from './types';
declare const prompt: <Q, T>(createPrompter: () => Prompter<Q, T>, actionFolder: string, args: Record<string, any>) => Promise<object | T>;
export default prompt;
//# sourceMappingURL=prompt.d.ts.map
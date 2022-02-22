export declare class ShowHelpError extends Error {
    constructor(message: string);
}
export declare const getNoGeneratorError: () => ShowHelpError;
export declare const getNoActionError: () => ShowHelpError;
export declare const getActionNotFoundError: (generator: any, action: any) => ShowHelpError;
export declare const getNoGeneratorsFoundMessage: () => string;

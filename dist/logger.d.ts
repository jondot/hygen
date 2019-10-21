declare class Logger {
    log: (message?: any, ...optionalParams: any[]) => void;
    constructor(log: any);
    colorful(msg: any): void;
    notice(msg: any): void;
    warn(msg: any): void;
    err(msg: any): void;
    ok(msg: any): void;
}
export default Logger;

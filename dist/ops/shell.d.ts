import type { ActionResult } from '../types';
declare const shell: ({ attributes: { sh, spinner, sh_ignore_exit }, body }: {
    attributes: {
        sh: any;
        spinner: any;
        sh_ignore_exit: any;
    };
    body: any;
}, args: any, { logger, exec }: {
    logger: any;
    exec: any;
}) => Promise<ActionResult>;
export default shell;
//# sourceMappingURL=shell.d.ts.map
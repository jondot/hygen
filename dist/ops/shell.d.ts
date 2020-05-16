import { ActionResult } from '../types';
declare const shell: ({ attributes: { sh }, body }: {
    attributes: {
        sh: any;
    };
    body: any;
}, args: any, { logger, exec }: {
    logger: any;
    exec: any;
}) => Promise<ActionResult>;
export default shell;

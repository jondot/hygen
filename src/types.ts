export interface Logger {
  ok: (msg: string) => void
  notice: (msg: string) => void
  warn: (msg: string) => void
  err: (msg: string) => void
  log: (msg: string) => void
  colorful: (msg: string) => void
}
export interface Prompter {
  prompt: (arg0: any) => Promise<any>
}
export interface RenderedAction {
  file: string
  attributes: any
  body: string
}
export interface RunnerConfig {
  exec: (sh: string, body: string) => void
  templates: string
  cwd: string
  logger: Logger
  debug: boolean
  helpers?: any
  createPrompter: () => Prompter
}

export interface ResolverIO {
  exists: (arg0: string) => Promise<boolean>
  load: (arg0: string) => Promise<Record<string, any>>
  none: (arg0: string) => Record<string, any>
}

export type ActionResult = any

export interface RunnerResult {
  success: boolean
  time: number
  actions: ActionResult[]
  failure?: {
    message: string
    availableActions: string[]
  }
}

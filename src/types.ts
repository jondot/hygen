export interface Action {
  name: string
  path: string
  generatorName: string
}

export type ActionsMap = Map<string, Action>

export interface GeneratorInfo {
  name: string
  path: string
  actions: Array<Action>
}

export interface Logger {
  ok: (msg: string) => void
  notice: (msg: string) => void
  warn: (msg: string) => void
  err: (msg: string) => void
  log: (msg: string) => void
  colorful: (msg: string) => void
}
export interface Prompter<Q, T> {
  prompt: (arg0: Q) => Promise<T>
}
export interface RenderedAction {
  file?: string
  attributes: any
  body: string
}

export interface TemplateConfigObj {
  path: string
  prefix?: string
}

export type TemplatesConfigOption = string | Array<string | TemplateConfigObj>

export type ResolvedTemplatePathConfig = TemplateConfigObj & {
  pathChecked: boolean
  exists?: boolean
  overridden?: boolean
}

export enum ConflictResolutionStrategy {
  /**
   * Stops the generation and lets the user know
   * that actions are in conflict
   */
  FAIL = 'fail',
  /**
   * keeps the action is defined last
   */
  OVERRIDE = 'override',
  /**
   * keeps the action that appears first skipping the ones that conflict
   */
  SKIP = 'skip',
}

export interface RunnerConfig {
  exec?: (sh: string, body: string) => void
  templates?: TemplatesConfigOption
  templatesOverride?: TemplatesConfigOption
  /**
   * Sets how action conflicts get resolved
   *
   * - "fail": [default] stops the generation and lets the user know that templates are in conflict
   * - "override": keeps the action that is defined last
   * - "skip": keeps the action that appears first skipping the ones that conflict
   *
   * @default "fail"
   */
  conflictResolutionStrategy?: ConflictResolutionStrategy
  cwd?: string
  logger?: Logger
  debug?: boolean
  helpers?: any
  localsDefaults?: any
  createPrompter?: <Q, T>() => Prompter<Q, T>
}

export interface ResolvedRunnerConfig extends RunnerConfig {
  templates: ResolvedTemplatePathConfig[]
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

export type ParamsResult = {
  templates: ResolvedTemplatePathConfig[]
  generator: string
  action: string
  subAction?: string
  actionFolder?: string
  name?: string
  dry?: boolean
} & object

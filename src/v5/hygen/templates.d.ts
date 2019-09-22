
export declare interface TemplateDetails {
  path: string
  attributes: MessageDirectives & InjectDirectives & ShellDirectives & WriteDirectives & FrontmatterAttributes
  content: string
}

export declare interface MessageDirectives {
  message: string
}

export declare interface ShellDirectives {
  sh: string
}

export declare interface WriteDirectives {
  to?: string
  unless_exists: boolean
}

export declare interface InjectDirectives {
  inject: boolean
  to?: string
  after?: string
  before?: string
  skip_if?: string
  prepend?: boolen
  append?: boolean
}

export declare interface FrontmatterAttributes {
  [s: string]: any
}

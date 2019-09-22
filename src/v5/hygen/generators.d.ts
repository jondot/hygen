import {TemplateDetails} from './templates'

export declare interface GeneratorConfig {
  generator: string
  action: string
  path?: string
  toIgnore?: string[]
  ignored?: string[]
  configFiles?: string[]
  templates?: TemplateDetails[]
}

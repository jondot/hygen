import { TemplateDetails } from './templates'

export interface generatorConfig {
  generator: string
  action: string
  path: string
  templates: Array<string | TemplateDetails>
}

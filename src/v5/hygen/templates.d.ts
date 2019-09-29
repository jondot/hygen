import { TemplateContext } from './context'

export interface TemplateDetails {
  path: string
  frontmatter: string
  context: TemplateContext
  body: string
}

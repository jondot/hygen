import { StringManipulationFn, StringManipulationLib } from './misc'

interface TemplateContext {
  name: string
  Name: string
  h: HelpersConfig

  [s: string]: any
}

interface HelpersConfig {
  capitalize: StringManipulationFn
  inflection: object
  changeCase: object

  [s: string]: any
}

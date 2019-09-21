/*~ You can declare types that are available via importing the module */
import * as Enquirer from 'enquirer'
import {Logger} from './logger'

export interface ActionResult {
  type: string
  subject: any
  status: string
  timing: number
  payload: any
}

export type CreateActionResult = (
  status: string,
  payload?: any,
  end?: Date,
) => ActionResult

export interface RenderedAction {
  file: string,
  attributes: InjectAttributes | AddAttributes,
  body: string
}

export interface InjectAttributes {
  to: string,
  inject: boolean,
  dry?: boolean,
  unless_exists?: boolean
}
export interface AddAttributes {
  to?: string,
  inject: boolean,
  unless_exists?: boolean,
  dry?: boolean,
}
export interface InjectTools {
  logger: Logger,
  cwd: string,
}
export interface AddTools {
  logger: Logger,
  cwd: string,
  createPrompter: () => Enquirer
}

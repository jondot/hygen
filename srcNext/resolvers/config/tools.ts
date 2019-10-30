import { ToolsConfig } from '../../types'
import { allRenderers } from '../../renderers'

export const createPrompter = () => require('enquirer')

export const fetchTools = (): ToolsConfig => ({
  prompter: createPrompter,
  render: allRenderers,
})
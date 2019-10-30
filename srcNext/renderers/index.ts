import { RenderConfig } from '../types'

export const noopRenderer = () => false

export const allRenderers: RenderConfig = {
  to: noopRenderer,
  inject: noopRenderer,
  shell: noopRenderer,
  message: noopRenderer,
}

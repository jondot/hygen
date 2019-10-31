import { RenderConfig } from '../types'

export const noopRenderer = () => false

export const allRenderers: RenderConfig = Object.freeze({
  to: noopRenderer,
  inject: noopRenderer,
  shell: noopRenderer,
  message: noopRenderer,
})

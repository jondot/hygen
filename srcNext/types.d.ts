export interface HygenConfig  {
  env?: object
  tools?: object
  helpers?: object
  generators?: object
  params?: object
}
export type HygenResolver = (config: HygenConfig) => Promise<HygenConfig>

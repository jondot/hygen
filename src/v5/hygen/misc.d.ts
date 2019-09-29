export type StringManipulationFn = (arg0: string) => string

export interface StringManipulationLib {
  [s: string]: StringManipulationFn
}

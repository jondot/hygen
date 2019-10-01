export type StringManipulationFn = (arg0: string, ...args: Array<any | void>) => string

export interface StringManipulationLib {

  [s: string]: StringManipulationFn
}

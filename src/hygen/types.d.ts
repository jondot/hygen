export declare interface StringMap {
  [s: string]: string
}
export declare interface ProcessEnv {
  [s: string]: string | undefined
}

export declare type strKVPair = [string,string | undefined]
export declare type strKVEntries = Array<strKVPair>
export declare interface NumberMap {
  [s: string]: number
}

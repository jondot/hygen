// for some reason lodash/fp takes 90ms to load.
// inline what we use here with the regular lodash.

export type ArrayMapCallback = (e: any, idx: number, arr: Array<any>) => any
export type ArrayFilterCallback = (e: any, idx: number, arr: Array<any>) => boolean

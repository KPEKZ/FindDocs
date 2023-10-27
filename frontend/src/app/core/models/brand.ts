export type Brand<T, Name extends string> = T & { [Symbol.species]: Name };

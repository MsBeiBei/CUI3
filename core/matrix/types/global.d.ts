export interface IArray<T, N extends number> extends Array<T> {
    length: N;
}
/**
 * 创建固定数组长度的数组泛型扩展
 */
declare interface FixedLengthArray<T, L extends number> extends Array<T> {
    0: T;
    length: L;
}

declare type Length<T extends unknown[]> =
    T extends { length: infer L } ? L : never;
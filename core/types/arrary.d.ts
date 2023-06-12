/**
 * 创建固定长度的数组
 */
declare interface FixedLengthArray<T extends unknown, L extends number> extends Array<T> {
    0: T;
    length: L;
}

/**
 * 推断数组的长度
 */
declare type Length<T extends unknown[]> =
    T extends { length: infer L } ? L : never;
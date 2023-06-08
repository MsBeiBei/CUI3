/**
 * 创建固定数组长度的数组泛型扩展
 */
declare type FixedLengthArray<T, L extends number> = [T, ...Array<T>] & { readonly length: L };

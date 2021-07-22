/*
 * @Author: yewei
 * @Date: 2021-07-20 15:33:59
 * @Last Modified by: yewei
 * @Last Modified time: 2021-07-20 15:34:30
 *
 * 实现 PickPromise，能够获取泛型的类型，例如：
 *
 * type A = Promise<number>;
 * type B = PickPromise<A>;
 */
type PickPromise<T extends Promise<any>> = T extends Promise<infer K> ? K : T;

type A = Promise<number>;
type B = PickPromise<A>;

/*
 * @Descripttion: reactive
 * @Author: Liu SaiSai
 * @Date: 2023-04-06 22:29:36
 * @LastEditors: Liu SaiSai
 */

import { track, trigger } from "./effect"
// reactive 通过proxy 做的拦截和代理
export function reactive(raw) {
  return new Proxy(raw, {
    // target 指向当前对象 key获取到用户访问的key 如{foo: 1} key 就是foo

    //Reflect 是一个内置的对象，它提供拦截 JavaScript 操作的方法 get set
    get(target, key){
      const res = Reflect.get(target, key)
      // TODO: 依赖收集
      track(target, key)
      return res
    },
    set(target, key, value) {
      const res = Reflect.set(target, key, value)

      // TODO: 触发依赖
      trigger(target, key)
      return res
    }
  })
}

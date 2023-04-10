/*
 * @Descripttion: 
 * @Author: Liu SaiSai
 * @Date: 2023-04-06 22:47:07
 * @LastEditors: Liu SaiSai
 */
class ReactiveEffect {
  private _fn: any

  constructor(fn, public scheduler?) {
    this._fn = fn;
  }
  run() {
    activeEffect = this
    return this._fn()
  }
}

// 收集依赖
const targetMap = new Map()
export function track(target, key) {
  // target -> key -> target
  let depsMap = targetMap.get(target)
  // 初始化没有的情况下创建一个map
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }

  let dep = depsMap.get(key)
  // 初始化没有的情况下创建一个dep
  if (!dep) {
    dep = new Set()
    depsMap.set(key, dep)
  }
  // 获取 fn 创建全局变量从effect中获取
  dep.add(activeEffect)
}

// 触发依赖
// 基于 target, key 取出depMap对象来  遍历之前取到所有的fn
export function trigger(target, key) {
  let depsMap = targetMap.get(target)
  let dep = depsMap.get(key)

  for (const effect of dep) {
    if (effect.scheduler) {
      effect.scheduler()
    } else {
      effect.run()
    }
    // 执行用户给的fn
    effect.run()
  }
}
// 
let activeEffect;
export function effect(fn, options: any = {}) {

  const _effect = new ReactiveEffect(fn, options.scheduler);
  _effect.run()

  return _effect.run.bind(_effect) // 处理指针问题  以当前的this
}

/*
 * @Descripttion: 测试文件
 * @Author: Liu SaiSai
 * @Date: 2023-04-06 21:51:15
 * @LastEditors: Liu SaiSai
 */
import { reactive } from "../reactive";
import { effect } from "../effect";


describe('effect', () => {
  it.skip('happy', () => {
    const user = reactive({
      age: 10
    })

    let nextAge;
    effect(() => {
      nextAge = user.age + 1
    })
    // 初始化
    expect(nextAge).toBe(11)
    // 更新
    user.age ++;
    expect(nextAge).toBe(12)
  })

  // 调用effect return runner
  it('should return runner when call effect', (runner) => {
    // 1. effect(fn) -> function(runner) -> fn -> return
    let foo = 10
    effect(() => {
      foo ++
      return "foo"
    })
    expect(foo).toBe(11)
    const r = runner()
    expect(foo).toBe(12)
    expect(r).toBe("foo")
  })
})

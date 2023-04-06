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
})

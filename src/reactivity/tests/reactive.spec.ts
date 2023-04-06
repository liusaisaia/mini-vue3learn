


import { reactive } from "../reactive";


describe('reactive', () => {
  it('happy', () => {
    const original = {foo: 1}
    const  observed = reactive(original)
    // 收集起来的依赖和之前值是不相等的
    expect(observed).not.toBe(original)
    // Observed.foo 得到 1
    expect(observed.foo).toBe(1)
  })
})

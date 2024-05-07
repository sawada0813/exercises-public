import { bitCount } from "./index";

describe('bitCount', ()=>{
  it('Right alignment', () => {
    expect.assertions(32)
    for (let num = 0; num < 32; num++) {
      expect(bitCount(Number('0b' + '1'.repeat(num) + '0'.repeat(32 - num)))).toBe(num)
    }
  })
  it('Left alignment', () => {
    expect.assertions(32)
    for (let num = 0; num < 32; num++) {
      expect(bitCount(Number('0b' + '0'.repeat(32-num) + '1'.repeat(num)))).toBe(num)
    }
  })
})
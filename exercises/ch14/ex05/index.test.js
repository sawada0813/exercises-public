import { expandTypeNames } from './index'

describe('expandTypeNames', () => {
  test("return correct type", () => {
    expect(expandTypeNames`${'A'}`).toBe('String')
    expect(expandTypeNames`${{ x: 1 }}`).toBe('Object')
    expect(expandTypeNames`${42}`).toBe('Number')
    expect(expandTypeNames`${[]}`).toBe('Array')
    expect(expandTypeNames`${/./}`).toBe('RegExp')
    expect(expandTypeNames`${false}`).toBe('Boolean')
    expect(expandTypeNames`${null}`).toBe('Null')
    expect(expandTypeNames`${undefined}`).toBe('Undefined')
    expect(expandTypeNames`${Symbol()}`).toBe('Symbol')
    expect(expandTypeNames`${()=>{}}`).toBe('Function')
  })
  test("return correct type with multiple values", () => {
    expect(expandTypeNames`${'A'}${{ x: 1 }}${42}${[]}${/./}${false}`).toBe('StringObjectNumberArrayRegExpBoolean')
  })
  test("return correct type with multiple values and strings", () => {
    expect(expandTypeNames`${'Hello'} world!`).toBe('String world!')
    expect(expandTypeNames`Hello ${'world!'}`).toBe('Hello String')
    expect(expandTypeNames`Hello ${'world'}!`).toBe('Hello String!')
  })
})
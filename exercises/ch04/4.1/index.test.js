import { add, sub, mul, div } from "./index";

describe('Four arithmetic operations', () => {
  describe('Add', () => {
    it('Add a positive number to a positive number', () => {
      const sampleA = { real: 1, imaginary: 1 }
      const sampleB = { real: 1, imaginary: 1 }
      const expectedResult = { real: 2, imaginary: 2 }
      expect(add(sampleA, sampleB)).toEqual(expectedResult)
    })
    it('Add a negative number to a negative number', () => {
      const sampleA = { real: -1, imaginary: -1 }
      const sampleB = { real: -1, imaginary: -1 }
      const expectedResult = { real: -2, imaginary: -2 }
      expect(add(sampleA, sampleB)).toEqual(expectedResult)
    })
    it('Add a positive number to a negative number', () => {
      const sampleA = { real: 1, imaginary: 1 }
      const sampleB = { real: -1, imaginary: -1 }
      const expectedResult = { real: 0, imaginary: 0 }
      expect(add(sampleA, sampleB)).toEqual(expectedResult)
    })
  })
  describe('Subtract',()=>{
    it('Subtract a positive number by a positive number', () => {
      const sampleA = { real: 2, imaginary: 2 }
      const sampleB = { real: 1, imaginary: 1 }
      const expectedResult = { real: 1, imaginary: 1 }
      expect(sub(sampleA, sampleB)).toEqual(expectedResult)
    })
    it('Subtract a negative number by a negative number', () => {
      const sampleA = { real: -2, imaginary: -2 }
      const sampleB = { real: -1, imaginary: -1 }
      const expectedResult = { real: -1, imaginary: -1 }
      expect(sub(sampleA, sampleB)).toEqual(expectedResult)
    })
    it('Subtract a positive number by a negative number', () => {
      const sampleA = { real: 2, imaginary: 2 }
      const sampleB = { real: -1, imaginary: -1 }
      const expectedResult = { real: 3, imaginary: 3 }
      expect(sub(sampleA, sampleB)).toEqual(expectedResult)
    })
  })
  describe('Multiply',()=>{
    it('Multiply a positive number by a positive number', () => {
      const sampleA = { real: 2, imaginary: 2 }
      const sampleB = { real: 1, imaginary: 1 }
      const expectedResult = { real: 2, imaginary: 2 }
      expect(mul(sampleA, sampleB)).toEqual(expectedResult)
    })
    it('Multiply a positive number by a negative number', () => {
      const sampleA = { real: 2, imaginary: 2 }
      const sampleB = { real: -1, imaginary: -1 }
      const expectedResult = { real: -2, imaginary: -2 }
      expect(mul(sampleA, sampleB)).toEqual(expectedResult)
    })
    it('Multiply a negative number by a negative number', () => {
      const sampleA = { real: -2, imaginary: -2 }
      const sampleB = { real: -1, imaginary: -1 }
      const expectedResult = { real: 2, imaginary: 2 }
      expect(mul(sampleA, sampleB)).toEqual(expectedResult)
    })
  })
  describe('Divide', ()=>{
    it('divide a positive number by a positive number', () => {
      const sampleA = { real: 4, imaginary: 4 }
      const sampleB = { real: 2, imaginary: 2 }
      const expectedResult = { real: 2, imaginary: 2 }
      expect(div(sampleA, sampleB)).toEqual(expectedResult)
    })
    it('divide a positive number by a negative number', () => {
      const sampleA = { real: 4, imaginary: 4 }
      const sampleB = { real: -2, imaginary: -2 }
      const expectedResult = { real: -2, imaginary: -2 }
      expect(div(sampleA, sampleB)).toEqual(expectedResult)
    })
    it('divide a negative number by a negative number', () => {
      const sampleA = { real: -4, imaginary: -4 }
      const sampleB = { real: -2, imaginary: -2 }
      const expectedResult = { real: 2, imaginary: 2 }
      expect(div(sampleA, sampleB)).toEqual(expectedResult)
    })
  })
})

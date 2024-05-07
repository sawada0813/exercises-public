import { canParseJson } from './index'

describe('canParseJson', ()=>{
  it('success', ()=>{
    const sampleJsonString = `{"group": {"usename": "sawada", "age": 20}}`
    expect(canParseJson(sampleJsonString)).toStrictEqual({
      success: true,
      data: { group: { usename: 'sawada', age: 20 } },
    })
  })
    it('error', () => {
      const invalidJsonString = `invalid String`
      expect(canParseJson(invalidJsonString).success).toBe(false)
    })
})
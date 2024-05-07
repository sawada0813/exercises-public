import { isHolidayWithIf, isHolidayWithSwitch } from './index'

describe('isHoliday', () => {
  it('Monday', () => {
    expect(isHolidayWithIf('月')).toBe(false)
    expect(isHolidayWithSwitch('月')).toBe(false)
  })
  it('Sunday', () => {
    expect(isHolidayWithIf('日')).toBe(true)
    expect(isHolidayWithSwitch('日')).toBe(true)
  })
  it('Invalid string param', () => {
    expect(isHolidayWithIf('Sunday')).toBe('Invalid string param')
    expect(isHolidayWithSwitch('Sunday')).toBe('Invalid string param')
  })
})

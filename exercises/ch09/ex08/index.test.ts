import { State, Action } from './index.ts'
import { AlarmClock } from './index.ts'

class AlarmClockForTest {
  state: State
  alarmClock: AlarmClock

  constructor() {
    this.alarmClock = new AlarmClock()
    this.state = 'normal'
  }
  setAlarm() {
    this.alarmClock.setAlarm.bind(this)()
  }
  cancelAlarm() {
    this.alarmClock.cancelAlarm.bind(this)()
  }
  reachedToAlarmTime() {
    this.alarmClock.reachedToAlarmTime.bind(this)()
  }
  snooze() {
    this.alarmClock.snooze.bind(this)()
  }
  elapseSnoozeTime() {
    this.alarmClock.elapseSnoozeTime.bind(this)()
  }
}

describe('状態遷移', () => {
  it('通常→アラームセット中', () => {
    const alarmClock = new AlarmClockForTest()
    alarmClock.setAlarm()
    expect(alarmClock.state).toBe('alarmSet')
  })
  it('アラームセット中→アラーム鳴動中/通常', () => {
    const alarmClock = new AlarmClockForTest()

    // アラームセット中→アラーム鳴動中
    alarmClock.state = 'alarmSet'
    alarmClock.reachedToAlarmTime()
    expect(alarmClock.state).toBe('alarmSounding')

    // アラームセット中→通常
    alarmClock.state = 'alarmSet'
    alarmClock.cancelAlarm()
    expect(alarmClock.state).toBe('normal')
  })
  it('アラーム鳴動中→通常/スヌーズ中', () => {
    const alarmClock = new AlarmClockForTest()

    // アラーム鳴動中→通常
    alarmClock.state = 'alarmSounding'
    alarmClock.cancelAlarm()
    expect(alarmClock.state).toBe('normal')

    // アラーム鳴動中→スヌーズ中
    alarmClock.state = 'alarmSounding'
    alarmClock.snooze()
    expect(alarmClock.state).toBe('snoozing')
  })
  it('スヌーズ中→通常/アラーム鳴動中', () => {
    const alarmClock = new AlarmClockForTest()

    // スヌーズ中→通常
    alarmClock.state = 'snoozing'
    alarmClock.cancelAlarm()
    expect(alarmClock.state).toBe('normal')

    // スヌーズ中→アラーム鳴動中
    alarmClock.state = 'snoozing'
    alarmClock.elapseSnoozeTime()
    expect(alarmClock.state).toBe('alarmSounding')
  })
})

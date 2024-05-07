export function isHolidayWithIf(param) {
  const holidayList = ['土', '日']
  const workDayList = ['月', '火', '水', '木', '金']
  if (holidayList.includes(param)) return true
  else if (workDayList.includes(param)) return false
  else return 'Invalid string param'
}

export function isHolidayWithSwitch(param) {
  const dayOfWeekList = ['土', '日', '月', '火', '水', '木', '金']
  if (!dayOfWeekList.includes(param)) return 'Invalid string param'
  switch(param) {
    case '土':
      return true
    case '日':
      return true
    case '月':
      return false
    case '火':
      return false
    case '水':
      return false
    case '木':
      return false
    case '金':
      return false
  }
}

// そもそも可読性が高くないコードだが
// 今回のケースでは個人的に if 文の方が可読性が高いと感じている
// if 文は条件式が１目でわかるため読みやすく
// switch 文では case をみて、これはなんだっけと switch(param) の
// param を確認しないといけないので読むのに時間がかかる
// エラーコードで分岐させるときはむしろ if 文は冗長で、switch の方が読みやすいかもしれない
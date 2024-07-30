const countDays = (year, month) => {
  // 指定された年の最終日の日付を返す
  return new Date(year, month, 0).getDate();
};

const countWeekdays = (startAt, endAt) => {
  const startDate = new Date(startAt);
  const endDate = new Date(endAt);
  const weekday = [1, 2, 3, 4, 5]; // 平日の曜日
  let weekdayCount = 0;

  while (startDate <= endDate) {
    if (weekday.includes(startDate.getDay())) {
      weekdayCount++
    }
    startDate.setDate(startDate.getDate() + 1);
  }
  return weekdayCount
};

function getLocaleDay(dateString, locale) {
  // 引数をDateオブジェクトに変換
  const date = new Date(dateString);
  // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options
  const weekday = date.toLocaleDateString(locale, { weekday: "long" });
  return weekday;
}

function getFirstDayOfLastMonth() {
  const now = new Date()
  const year = now.getFullYear() // 現在の年を取得
  const month = now.toLocaleDateString().split('/')[1] // 現在の月を取得
  return new Date(Date.UTC(year, month - 2, 1)) 
}

export { countDays, countWeekdays, getLocaleDay, getFirstDayOfLastMonth }

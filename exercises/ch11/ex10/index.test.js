import {
  countDays,
  countWeekdays,
  getLocaleDay,
  getFirstDayOfLastMonth,
} from "./index.js";

test("countDays", () => {
  expect(countDays(2021, 1)).toBe(31);
  expect(countDays(2021, 2)).toBe(28);
  expect(countDays(2021, 3)).toBe(31);
  expect(countDays(2021, 4)).toBe(30);
  expect(countDays(2021, 5)).toBe(31);
  expect(countDays(2021, 6)).toBe(30);
  expect(countDays(2021, 7)).toBe(31);
  expect(countDays(2021, 8)).toBe(31);
  expect(countDays(2021, 9)).toBe(30);
  expect(countDays(2021, 10)).toBe(31);
  expect(countDays(2021, 11)).toBe(30);
  expect(countDays(2021, 12)).toBe(31);
});

test("getNumberOfWeekDays", () => {
  expect(countWeekdays("2023-10-01", "2023-10-31")).toBe(22);
  expect(countWeekdays("2023-10-01", "2023-10-07")).toBe(5);
  expect(countWeekdays("2023-10-01", "2023-10-01")).toBe(0);
  expect(countWeekdays("2023-10-02", "2023-10-02")).toBe(1);
});

test("getLocaleDay", () => {
  expect(getLocaleDay("2023-10-01", "ja-JP")).toBe("日曜日");
  expect(getLocaleDay("2023-10-02", "ja-JP")).toBe("月曜日");
  expect(getLocaleDay("2023-10-02", "en-US")).toBe("Monday");
  expect(getLocaleDay("2023-10-01", "fr-FR")).toBe("dimanche");
});

test("getFirstDayOfLastMonth", () => {
  expect(getFirstDayOfLastMonth()).toEqual(
    new Date("2024-06-01T00:00:00.000Z"),
  ); // 宿題デバッグ用
  // expect(getFirstDayOfLastMonth()).toEqual("2024/7/1 0:00:00"); // 8月2日用
});

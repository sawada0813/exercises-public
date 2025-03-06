import { expect, test } from "@playwright/test";

test("ページタイトルのテスト", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  expect(await page.title()).toBe("Alarm App");
});

test("再生ボタンを押すと「Playing...」が表示される", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.click('button:has-text("再生")');
  expect(await page.locator("text=Playing...").isVisible()).toBeTruthy();
});

test("録音ボタンを押すと「Recording...」が表示される", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.click('button:has-text("録音開始")');
  expect(await page.locator("text=Recording...").isVisible()).toBeTruthy();
  await page.click('button:has-text("録音停止")');
  expect(await page.locator("text=Recording...").isVisible()).toBeFalsy();
});

test("再生ボタンと録音ボタンを押すと「Playing...」と「Recording...」が表示される", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/");
  await page.click('button:has-text("再生")');
  expect(await page.locator("text=Playing...").isVisible()).toBeTruthy();
  await page.click('button:has-text("録音開始")');
  expect(await page.locator("text=Recording...").isVisible()).toBeTruthy();
  await page.click('button:has-text("録音停止")');
  expect(await page.locator("text=Recording...").isVisible()).toBeFalsy();
});

test("時計を表示できる", async ({ page }) => {
  const mockDate = new Date(2025, 2, 7, 10, 0, 0); // 2025年3月7日 10:00:00
  await page.addInitScript((dateString) => {
    const mockDate = new Date(dateString);
    const OriginalDate = Date;
    (window.Date as any) = class extends OriginalDate {
      constructor() {
        super();
        return mockDate;
      }
    };
  }, mockDate.toISOString());
  await page.goto("http://localhost:3000/");
  await page.waitForTimeout(3000);
  expect(await page.locator("div#clock").textContent()).toContain("10:00:00");
});

test("アラームをセットできる", async ({ page }) => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  await page.goto("http://localhost:3000/");
  await page.waitForTimeout(3000);
  expect(await page.locator("div#clock").textContent()).toContain(
    hours + ":" + String(minutes).padStart(2, "0") + ":"
  );

  const datePassedTenSeconds = date.setSeconds(date.getSeconds() + 10);
  const hoursPassedTenSeconds = new Date(datePassedTenSeconds).getHours();
  const minutesPassedTenSeconds = new Date(datePassedTenSeconds).getMinutes();
  const secondsPassedTenSeconds = new Date(datePassedTenSeconds).getSeconds();

  await page.selectOption(
    "#hours",
    String(hoursPassedTenSeconds).padStart(2, "0")
  );
  await page.selectOption(
    "#minutes",
    String(minutesPassedTenSeconds).padStart(2, "0")
  );
  await page.selectOption(
    "#seconds",
    String(secondsPassedTenSeconds).padStart(2, "0")
  );
  await page.click('button:has-text("アラームセット")');

  await page.waitForTimeout(10000);
  expect(await page.locator("text=Playing...").isVisible()).toBeTruthy();
});

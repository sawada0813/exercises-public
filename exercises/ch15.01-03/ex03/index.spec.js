import { expect, test } from "@playwright/test";

test.describe("integrity test", () => {
  test("correct integrity", async ({ page }) => {
    await page.goto("http://localhost:3000/ch15.01-03/ex03/index.html");
    const paragraph = await page.locator("p").textContent();
    expect(paragraph).toBe("Success!");
  });

  // 異常系のテストができていない
  test.skip("invalid integrity", async ({ page }) => {
    await page.goto("http://localhost:3000/ch15.01-03/ex03/invalidHash.html");
    const paragraph = await page.locator("p").textContent();
    expect(paragraph).toBe("invalid integrity");
  });
});

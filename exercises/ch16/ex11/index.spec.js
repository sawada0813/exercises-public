import { expect, test } from "@playwright/test";

test.describe("name and greeting", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/");
  });

  test("GET /", async ({ page }) => {
    expect(await page.textContent("body")).toContain("Name:");
    expect(await page.textContent("body")).toContain("Submit");
  });

  test("POST /greeting", async ({ page }) => {
    await page.fill('input[name="name"]', "Taro");
    await page.fill('input[name="greeting"]', "Hello");

    await page.click('button[type="submit"]');

    expect(await page.textContent("body")).toContain("Taro");
    expect(await page.textContent("body")).toContain("Hello");
  });

  test("GET /invalid", async ({ page }) => {
    await page.goto("http://localhost:3000/invalid");

    expect(await page.textContent("body")).toContain("Not Found");
  });

  test("POST /invalid", async ({ page }) => {
    await page.goto("http://localhost:3000/invalid");

    expect(await page.textContent("body")).toContain("Not Found");
  });
});

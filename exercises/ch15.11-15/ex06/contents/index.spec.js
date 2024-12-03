import { expect, test } from "@playwright/test";

/**
 * @param {import("@playwright/test").Page} page
 * @param {string} todo
 */
async function addToDo(page, todo) {
  await page.getByRole("textbox").fill(todo);
  await page.getByRole("button", { name: "Add" }).click();
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {number} index
 */
async function checkToDo(page, index) {
  await page.getByRole("listitem").nth(index).getByRole("checkbox").check();
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {number} index
 */
async function deleteToDo(page, index) {
  await page
    .getByRole("listitem")
    .nth(index)
    .getByRole("button", { name: "❌" })
    .click();
}

/**
 * @param {import("@playwright/test").Page} page
 */
async function countToDos(page) {
  return await page.getByRole("listitem").count();
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {number} index
 */
function queryToDo(page, index) {
  return page.getByRole("listitem").nth(index);
}

test.describe("simple todo app", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/ch15.11-15/ex04/contents/");
  });

  test("初期値は todo がない", async ({ page }) => {
    expect(await countToDos(page)).toBe(0);
  });

  test("新規の todo を追加できる", async ({ page }) => {
    await addToDo(page, "質問表に質問を記載する");

    expect(await countToDos(page)).toBe(1);

    const todo = queryToDo(page, 0);
    const label = todo.getByText("質問表に質問を記載する");
    await expect(label).toBeVisible();
    await expect(label).toHaveCSS("text-decoration-line", "none");
  });

  test("複数の todo を追加できる", async ({ page }) => {
    await addToDo(page, "質問表に質問を記載する");
    await addToDo(page, "練習問題を完了する");

    expect(await countToDos(page)).toBe(2);

    const todo1 = queryToDo(page, 0);
    const label1 = todo1.getByText("練習問題を完了する");
    await expect(label1).toBeVisible();
    await expect(label1).toHaveCSS("text-decoration-line", "none");

    const todo2 = queryToDo(page, 1);
    const label2 = todo2.getByText("質問表に質問を記載する");
    await expect(label2).toBeVisible();
    await expect(label2).toHaveCSS("text-decoration-line", "none");
  });

  test("todo を削除できる", async ({ page }) => {
    await addToDo(page, "質問表に質問を記載する");
    await addToDo(page, "練習問題を完了する");
    await deleteToDo(page, 0);

    expect(await countToDos(page)).toBe(1);

    const todo = queryToDo(page, 0);
    const label = todo.getByText("質問表に質問を記載する");
    await expect(label).toBeVisible();
    await expect(label).toHaveCSS("text-decoration-line", "none");
  });

  test("todo を完了できる", async ({ page }) => {
    await addToDo(page, "質問表に質問を記載する");
    await addToDo(page, "練習問題を完了する");
    await checkToDo(page, 1);

    expect(await countToDos(page)).toBe(2);

    const todo1 = queryToDo(page, 0);
    const label1 = todo1.getByText("練習問題を完了する");
    await expect(label1).toBeVisible();
    await expect(label1).toHaveCSS("text-decoration-line", "none");

    const todo2 = queryToDo(page, 1);
    const label2 = todo2.getByText("質問表に質問を記載する");
    await expect(label2).toBeVisible();
    await expect(label2).toHaveCSS("text-decoration-line", "line-through");
  });

  test("別ブラウザで追加した todo が同期される", async ({ page, context }) => {
    await addToDo(page, "質問表に質問を記載する");

    const newContext = await context.newPage();
    await newContext.goto("http://localhost:3000/ch15.11-15/ex04/contents/");

    expect(await countToDos(newContext)).toBe(1);

    const todo = queryToDo(newContext, 0);
    const label = todo.getByText("質問表に質問を記載する");
    await expect(label).toBeVisible();
    await expect(label).toHaveCSS("text-decoration-line", "none");

    const checkbox = todo.getByRole("checkbox");
    await expect(checkbox).not.toBeChecked();
  });

  test("別ブラウザで削除した todo が同期される", async ({ page, context }) => {
    await addToDo(page, "質問表に質問を記載する");

    const newContext = await context.newPage();
    await newContext.goto("http://localhost:3000/ch15.11-15/ex04/contents/");

    expect(await countToDos(newContext)).toBe(1);

    await deleteToDo(newContext, 0);

    expect(await countToDos(page)).toBe(0);
  });

  test("別ブラウザで完了した todo が同期される", async ({ page, context }) => {
    await addToDo(page, "質問表に質問を記載する");

    const newContext = await context.newPage();
    await newContext.goto("http://localhost:3000/ch15.11-15/ex04/contents/");

    expect(await countToDos(newContext)).toBe(1);

    await checkToDo(newContext, 0);

    const todo = queryToDo(newContext, 0);
    const label = todo.getByText("質問表に質問を記載する");
    await expect(label).toBeVisible();
    await expect(label).toHaveCSS("text-decoration-line", "line-through");

    const checkbox = todo.getByRole("checkbox");
    await expect(checkbox).toBeChecked();
  });

  test("別ブラウザで追加した複数の todo の内、特定のものだけ削除できる", async ({
    page,
    context,
  }) => {
    await addToDo(page, "質問表に質問を記載する");
    await addToDo(page, "練習問題を完了する");

    const newContext = await context.newPage();
    await newContext.goto("http://localhost:3000/ch15.11-15/ex04/contents/");

    expect(await countToDos(newContext)).toBe(2);

    await deleteToDo(newContext, 0);

    expect(await countToDos(page)).toBe(1);

    const todo = queryToDo(newContext, 0);
    const label = todo.getByText("練習問題を完了する");
    await expect(label).toBeVisible();
    await expect(label).toHaveCSS("text-decoration-line", "none");

    const checkbox = todo.getByRole("checkbox");
    await expect(checkbox).not.toBeChecked();
  });

  test("別ブラウザで追加した複数の todo の内、特定のものだけ完了できる", async ({
    page,
    context,
  }) => {
    await addToDo(page, "質問表に質問を記載する");
    await addToDo(page, "練習問題を完了する");

    const newContext = await context.newPage();
    await newContext.goto("http://localhost:3000/ch15.11-15/ex04/contents/");

    expect(await countToDos(newContext)).toBe(2);

    await checkToDo(newContext, 0);

    expect(await countToDos(page)).toBe(2);

    const todo = queryToDo(newContext, 0);
    const label = todo.getByText("質問表に質問を記載する");
    await expect(label).toBeVisible();
    await expect(label).toHaveCSS("text-decoration-line", "line-through");

    const checkbox = todo.getByRole("checkbox");
    await expect(checkbox).toBeChecked();
  });

  test("ブラウザをリロードしても todo が保持される", async ({ page }) => {
    await addToDo(page, "質問表に質問を記載する");
    await addToDo(page, "練習問題を完了する");
    await addToDo(page, "早く寝て備える");

    await checkToDo(page, 1);
    await deleteToDo(page, 2);

    await page.reload();

    expect(await countToDos(page)).toBe(2);

    const todo = queryToDo(page, 0);
    const label = todo.getByText("練習問題を完了する");
    await expect(label).toBeVisible();
    await expect(label).toHaveCSS("text-decoration-line", "line-through");

    const checkedTodo = queryToDo(page, 1);
    const checkedLabel = checkedTodo.getByText("早く寝て備える");
    await expect(checkedLabel).toBeVisible();
    await expect(checkedLabel).toHaveCSS("text-decoration-line", "none");
  });
});

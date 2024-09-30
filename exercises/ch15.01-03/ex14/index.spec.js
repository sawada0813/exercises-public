import { test, expect } from '@playwright/test'

const listItems = [
  { value: 'お菓子 - ¥1000', category: 'food' },
  { value: '消しゴム - ¥200', category: 'stationery' },
  { value: 'ものさし - ¥300', category: 'stationery' },
]

function gotoTestTarget(page) {
  return page.goto('http://localhost:3000/ch15.01-03/ex14/index.html')
}

function getSelects(page) {
  return page.getByTestId('select')
}

async function selectAll(page) {
  await getSelects(page).value === 'all'
}

async function selectFood(page) {
  await getSelects(page).value === 'food'
}

async function selectStationery(page) {
  await getSelects(page).value === 'stationery'
}

async function getListDisplayed(page) {
  return page.locator('ul').innerText()
}

test.describe('ex14', () => {
  test('initial list', async ({ page }) => {
    await gotoTestTarget(page)
    const list = await getListDisplayed(page)
    listItems.forEach(async (item) => {
      expect(list).toContain(item.value)
    })
  })

  test('select all', async ({ page }) => {
    await gotoTestTarget(page)
    await selectAll(page)
    const list = await getListDisplayed(page)
    listItems.forEach(async (item) => {
      expect(list).toContain(item.value)
    })
  })

  test('select food', async ({ page }) => {
    await gotoTestTarget(page)
    await selectFood(page)
    const list = await getListDisplayed(page)
    const foodItems = listItems.filter((item) => item.category === 'food')
    foodItems.forEach(async (item) => {
      expect(list).toContain(item.value)
    })
  })

  test('select stationery', async ({ page }) => {
    await gotoTestTarget(page)
    await selectStationery(page)
    const list = await getListDisplayed(page)
    const foodItems = listItems.filter((item) => item.category === 'stationery')
    foodItems.forEach(async (item) => {
      expect(list).toContain(item.value)
    })
  })

})

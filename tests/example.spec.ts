import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000')
  await page.getByRole('button', { name: /Зрозуміло|agree|allow/i }).click()
})


test.describe.only('home page', () => {
  test('should open the home page and display the correct title', async ({ page }) => {
    await expect(page).toHaveTitle('Легкий шлях до нового авто | bycar.in.ua')
  })
  test('find the /about, click on it, confirm this page', async ({page}) => {
    await page.locator('header').getByRole('link', { name: 'Про нас' }).click()
    await expect(page).toHaveURL('about')
    await page.mouse.wheel(0, 1500)
    await expect(page.getByText('Вітаємо вас на сайті ByCar!')).toBeVisible()

  })
  test.describe('cars catalog', () =>{
    test('find cars catalog and click on it', async ({page}) => {
      await page.locator('header').getByRole('link', { name: 'Aвто в наявності' }).click()
      await expect(page).toHaveURL('catalog')
    })
    test('hover the first car in the list and open it', async ({page}) => {
      await page.locator('header').getByRole('link', { name: 'Aвто в наявності' }).click()
      await expect(page).toHaveURL('catalog')
      const items = await page.locator('div.grid a').all()
      await items[0]?.hover()
      await page.mouse.wheel(0, 200)
      await page.waitForTimeout(2000)
      await items[0]?.click()
      await page.waitForTimeout(2000)
      await page.getByRole('button', { name: 'Отримати консультацію'})
      // const count = await carsList.count()
      // for (let i = 0; i < count; i++) {
      //   await carsList.nth(i).hover()
      //   await page.waitForTimeout(3000)
      // }
    })
  })})
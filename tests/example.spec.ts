import { expect, test } from '@playwright/test'
import { link } from 'node:fs';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000');
})

test.describe('home page', () => {
  test('should open the home page and display the correct title', async ({ page }) => {
    await expect(page).toHaveTitle('Легкий шлях до нового авто | bycar.in.ua')
  })
  test('should accept the cookies', async ({page}) => {
    await page.getByRole('button', { name: 'Зрозуміло' }).click()
 

  })
  test('find the /about, click on it, confirm this page', async ({page}) => {
    await page.locator('header').getByRole('link', { name: 'Про нас' }).click()
    await expect(page).toHaveURL('about')
    await page.getByRole('button', { name: 'Зрозуміло' }).click()
    
    await page.mouse.wheel(0, 1500)
    await expect(page.getByText('Вітаємо вас на сайті ByCar!')).toBeVisible()

  })
})
  

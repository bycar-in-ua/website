import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000");
  await page.getByRole("button", { name: "Зрозуміло" }).click();
});

test.describe("about page", () => {
  test("should open the site and check that it's correctly opened", async ({ page }) => {
    await expect(page).toHaveTitle("Легкий шлях до нового авто | bycar.in.ua");
  });

  test("find the /about, click on it, confirm this page", async ({ page }) => {
    await page.locator("header").getByRole("link", { name: "Про нас" }).click();
    await expect(page).toHaveURL("/about");
    await page.mouse.wheel(0, 1500);
    await expect(page.getByText("Вітаємо вас на сайті ByCar!")).toBeVisible();
  });
});

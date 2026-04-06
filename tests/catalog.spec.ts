import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000");
  await page.getByRole("button", { name: "Зрозуміло" }).click();
});

test.describe("cars catalog", () => {
  test("find cars catalog and click on it", async ({ page }) => {
    await page.locator("header").getByRole("link", { name: "Aвто в наявності" }).click();
    await expect(page).toHaveURL("/catalog");
  });

  test("hover the first car in the list and open it", async ({ page }) => {
    await page.locator("header").getByRole("link", { name: "Aвто в наявності" }).click();
    const catalog = page.getByTestId("carlistcatalog");
    const firstCar = catalog.locator("a").first();

    await firstCar.hover();
    await page.mouse.wheel(0, 200);
    await firstCar.click();

    await page.waitForTimeout(3000);
    await page.getByRole("button", { name: "Отримати консультацію" });
  });
});

test("hover the second car, click, hovering other cars", async ({ page }) => {
  await page.locator("header").getByRole("link", { name: "Aвто в наявності" }).click();
  const catalog = page.getByTestId("carlistcatalog");
  const items = catalog.locator("a");
  await page.mouse.wheel(0, 200);
  await items.nth(1).hover();
  await items.nth(1).click();
  await page.waitForTimeout(3000);
  page.getByRole("button", { name: "Отримати консультацію" });
  await page.goBack();

  for (let i = 0; i < 3; i++) {
    await items.nth(i).hover();
    await page.waitForTimeout(500);
  }
});

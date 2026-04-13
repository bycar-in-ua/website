import { expect, test } from "@playwright/test";
import { acceptCookies } from "./helpers/acceptCookies";

const appUrl = process.env.APP_URL || "http://localhost:3000";

test.beforeEach(async ({ page }) => {
  await page.goto(appUrl + "/catalog");
  expect(page.url()).toBe(appUrl + "/catalog");
  await acceptCookies(page);
});

test.describe("cars catalog", () => {
  test("hover the first car in the list and open it", async ({ page }) => {
    await page.locator("header").getByRole("link", { name: "Aвто в наявності" }).click();
    const catalog = page.getByTestId("cars-catalog");
    const firstCar = catalog.locator("a").first();

    await firstCar.hover();
    await page.mouse.wheel(0, 200);
    await firstCar.click();
    expect(page.url()).toContain(appUrl + "/model/");
    await expect(page.getByRole("button", { name: "Отримати консультацію" })).toBeVisible();
  });
});

test("hover the second car, click, hovering other cars", async ({ page }) => {
  await page.locator("header").getByRole("link", { name: "Aвто в наявності" }).click();
  const items = page.getByTestId("cars-catalog-grid").getByTestId("catalog-car");
  const secondCar = items.nth(1);

  await page.mouse.wheel(0, 200);
  await secondCar.hover();
  await secondCar.click();

  await expect (page.getByRole("button", { name: "Отримати консультацію" })).toBeVisible();
  await page.goBack();

  for (let i = 0; i < 3; i++) {
    await items.nth(i).hover();
  }
});

test("opens sorting dropdown", async ({ page }) => {
  await page.locator("header").getByRole("link", { name: "Aвто в наявності" }).click();
  await expect(page).toHaveURL("/catalog");

  const sortButton = page.getByTestId("catalog-sort-button");
  await expect(sortButton).toBeVisible();
  await sortButton.click();
  const sortingItem = page.getByRole("menuitem");
  await expect(sortingItem).toHaveCount(4);
  for (let i = 0; i < 4; i++) {
    await sortingItem.nth(i).click();
    await sortingItem.nth(i).highlight();
    await sortButton.click();
    await sortButton.highlight();
  }
});

import { expect, test } from "@playwright/test";
import { acceptCookies } from "./helpers/acceptCookies";

test.beforeEach(async ({ page }) => {
  await page.goto("/catalog");
  await acceptCookies(page);
});

test.describe("cars catalog", () => {
  test("hover the first car in the list and open it", async ({ page }) => {
    const catalog = page.getByTestId("cars-catalog");
    const firstCar = catalog.locator("a").first();

    await firstCar.hover();
    await page.mouse.wheel(0, 200);
    await firstCar.click();
    await expect(page).toHaveURL(/\/model\//);
    await expect(page.getByRole("button", { name: "Отримати консультацію" })).toBeVisible();
  });

  test("hover the second car, click, hovering other cars", async ({ page }) => {
    const items = page.getByTestId("models-catalog-grid").getByTestId("catalog-car");
    const secondCar = items.nth(1);

    await page.mouse.wheel(0, 200);
    await secondCar.hover();
    await secondCar.click();

    await expect(page.getByRole("button", { name: "Отримати консультацію" })).toBeVisible();
    await page.goBack();

    for (let i = 0; i < 3; i++) {
      await items.nth(i).hover();
    }
  });

  test("opens sorting dropdown", async ({ page }) => {
    const sortButton = page.getByTestId("catalog-sort-button");
    await expect(sortButton).toBeVisible();
    await sortButton.click();
    const sortingItem = page.getByRole("menuitem");
    await expect(sortingItem).toHaveCount(5);
    for (let i = 0; i < 4; i++) {
      await sortingItem.nth(i).click();
      await sortingItem.nth(i).highlight();
      await sortButton.click();
      await sortButton.highlight();
    }
  });
});

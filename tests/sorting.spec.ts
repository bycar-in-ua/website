import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000");
  await page.getByRole("button", { name: "Зрозуміло" }).click();
});

test.describe("visit catalog and check sorting", () => {
  test("opens catalog page", async ({ page }) => {
    await page.locator("header").getByRole("link", { name: "Aвто в наявності" }).click();
    await expect(page).toHaveURL("/catalog");
  });

  test("opens sorting dropdown", async ({ page }) => {
    await page.locator("header").getByRole("link", { name: "Aвто в наявності" }).click();
    await expect(page).toHaveURL("/catalog");

    const sortButton = page.getByTestId("catalog-sort-button");
    await expect(sortButton).toBeVisible();
    await sortButton.click();
    await page.waitForTimeout(3000);
    const sortingItem = page.getByRole("menuitem");
    await expect(sortingItem).toHaveCount(4);
    for (let i = 0; i < 4; i++) {
      await sortingItem.nth(i).click();
      await sortingItem.nth(i).highlight();
      await sortButton.click();
      await sortButton.highlight();
      await page.waitForTimeout(1500);
    }
  });
});

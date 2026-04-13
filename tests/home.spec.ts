import { expect, test } from "@playwright/test";
import { acceptCookies } from "./helpers/acceptCookies";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await acceptCookies(page);
});
test.describe("Home page", () => {
  test("check that home page loads correctly", async ({ page }) => {
    await expect(page).toHaveTitle("Легкий шлях до нового авто | bycar.in.ua");
    await expect(page.locator("body")).toContainText("Переглядайте, порівнюйте");
    await test.step("Check that the 'Переглянути 50 авто' button is visible and enabled", async () => {
      const button = page.getByRole("button", { name: /ˆПереглянути 50/ });
      await button.scrollIntoViewIfNeeded();
      await expect(button).toBeVisible();
      await expect(button).toBeEnabled();
      await button.click();
      await expect(page).toHaveURL("/catalog");
    });
  });
});

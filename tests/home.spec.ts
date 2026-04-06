import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000");
  await page.getByRole("button", { name: "Зрозуміло" }).click();
});

test.describe("home page", () => {
  test("should open the home page and display the correct title", async ({ page }) => {
    await expect(page).toHaveTitle("Легкий шлях до нового авто | bycar.in.ua");
  });
});

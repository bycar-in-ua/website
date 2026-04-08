import { expect, test } from "@playwright/test";
import { acceptCookies } from "./helpers/acceptCookies";

const appUrl = process.env.APP_URL || "http://localhost:3000";

test.beforeEach(async ({ page }) => {
  await page.goto(appUrl + "/about");
  expect(page.url()).toBe(appUrl + "/about");
  await acceptCookies(page);
});

test.describe("About page", () => {
  test("check that header exists", async ({ page }) => {
    const header = page.getByTestId("about-header");
    await expect(header).toBeVisible();
  });
  test("check that footer exists", async ({ page }) => {
    const footer = page.getByTestId("about-footer");
    await expect(footer).toBeVisible();
  });
  test("check that main not empty and contain text", async ({ page }) => {
    const main = page.getByTestId("about-main");
    await expect(main).toBeVisible();
    await expect(main).not.toBeEmpty();
    await expect(main).toContainText("авто");
  });
});

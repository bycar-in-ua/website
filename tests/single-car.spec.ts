import { expect, test } from "@playwright/test";
import { acceptCookies } from "./helpers/acceptCookies";

const appUrl = process.env.APP_URL || "http://localhost:3000";

test.beforeEach(async ({ page }) => {
  await page.goto(appUrl + "/model/26-q3-sportback-2019");
  await expect(page).toHaveURL(/\/model\/[\w-]+/);
  await acceptCookies(page);
});

test.describe("Single car page", () => {
  test("check that basic information is displayed", async ({ page }) => {
    const slider = page.getByTestId("vehicle-gallery");
    const sliderImages = slider.locator("img");
    await sliderImages.first().waitFor();
    await expect(slider.locator("img")).not.toHaveCount(0);
    await sliderImages.nth(1).click();
    await page.keyboard.press("Escape");
    await expect(page.locator("h1")).toContainText("Audi Q3 Sportback");
    const consultationButton = page.locator("button[type='button']", { hasText: "Отримати консультацію" });
    await expect(consultationButton).toBeVisible();
    await expect(consultationButton).toBeEnabled();
  });
});

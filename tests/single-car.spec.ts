import { expect, test } from "@playwright/test";
import { acceptCookies } from "./helpers/acceptCookies";

test.beforeEach(async ({ page }) => {
  await page.goto("/model/26-q3-sportback-2019");
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

  test("check car configuration and price dynamically change", async ({ page }) => {
    // Get trims section
    const trimsSection = page.getByTestId("trims-list");
    const trims = trimsSection.locator("> div"); // Get direct children (trim items)

    const trimsCount = await trims.count();
    expect(trimsCount).toBeGreaterThan(1);

    const trimsPrice = page.getByTestId("trims-price-range");
    const initialTrimsPrice = await trimsPrice.textContent();

    if (trimsCount > 1) {
      await trims.nth(1).click();
      await page.waitForTimeout(300);

      const newTrimsPrice = await trimsPrice.textContent();
      expect(newTrimsPrice).toBeDefined();
      expect(newTrimsPrice).not.toBe(initialTrimsPrice);
    }

    const powerUnitsSection = page.getByTestId("power-units-list");
    const powerUnits = powerUnitsSection.locator("> div");

    const powerUnitsCount = await powerUnits.count();
    expect(powerUnitsCount).toBeGreaterThan(0);

    const powerUnitPrice = page.getByTestId("power-units-price");
    const initialPowerUnitPrice = await powerUnitPrice.textContent();

    if (powerUnitsCount > 1) {
      await powerUnits.nth(1).click();

      const newPowerUnitPrice = await powerUnitPrice.textContent();
      expect(newPowerUnitPrice).toBeDefined();
      expect(newPowerUnitPrice).not.toBe(initialPowerUnitPrice);
    }
  });
});

// add check for Двигун та Трансмісія when you choose different trims and power units

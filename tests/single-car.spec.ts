import { expect, test } from "./fixtures/singleCar.fixture";

test.describe("Single car page", () => {
  test("check that basic information is displayed", async ({ singleCar }) => {
    await singleCar.galleryImages.first().waitFor();
    await expect(singleCar.galleryImages).not.toHaveCount(0);
    await singleCar.galleryImages.nth(1).click();
    await singleCar.page.keyboard.press("Escape");

    await expect(singleCar.title).toContainText("Audi Q3 Sportback");
    await expect(singleCar.consultationButton).toBeVisible();
    await expect(singleCar.consultationButton).toBeEnabled();
  });

  test("check car configuration and price dynamically change", async ({ singleCar }) => {
    const trimsCount = await singleCar.trims.count();
    expect(trimsCount).toBeGreaterThan(1);

    const initialTrimsPrice = await singleCar.trimsPrice.textContent();

    if (trimsCount > 1) {
      await singleCar.trims.nth(1).click();
      await singleCar.page.waitForTimeout(300);

      const newTrimsPrice = await singleCar.trimsPrice.textContent();
      expect(newTrimsPrice).toBeDefined();
      expect(newTrimsPrice).not.toBe(initialTrimsPrice);
    }

    const powerUnitsCount = await singleCar.powerUnits.count();
    expect(powerUnitsCount).toBeGreaterThan(0);

    const initialPowerUnitPrice = await singleCar.powerUnitPrice.textContent();

    if (powerUnitsCount > 1) {
      await singleCar.powerUnits.nth(1).click();

      const newPowerUnitPrice = await singleCar.powerUnitPrice.textContent();
      expect(newPowerUnitPrice).toBeDefined();
      expect(newPowerUnitPrice).not.toBe(initialPowerUnitPrice);
    }
  });

  test("check that Similar cars section is displayed and contains at least 3 cars", async ({ singleCar }) => {
    await expect(singleCar.similarCarsSection).toBeVisible();
    expect(await singleCar.similarCars.count()).toBeGreaterThan(2);
  });
});

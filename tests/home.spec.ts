import { expect, test } from "@playwright/test";
import { acceptCookies } from "./helpers/acceptCookies";

const appUrl = process.env.APP_URL || "http://localhost:3000/";

test.beforeEach(async ({ page }) => {
  await page.goto(appUrl);
  expect(page.url()).toBe(appUrl);
  await acceptCookies(page);
});

test.describe("home page filters", () => {
  test("check that home filter exists", async ({ page }) => {
    const filter = page.getByTestId("home-filter");
    await expect(filter).toBeVisible();
  });
  test.describe("checking filter functionality", () => {
    test("check that home price filter can be applied", async ({ page }) => {
      const priceFilter = page.getByTestId("home-filter-price");
      await priceFilter.click();
      await expect(priceFilter).toBeVisible();
      const minPriceInput = page.getByTestId("home-filter-price-min");
      const maxPriceInput = page.getByTestId("home-filter-price-max");
      await expect(minPriceInput).toBeVisible();
      await expect(maxPriceInput).toBeVisible();
      await minPriceInput.fill("30000");
      await maxPriceInput.fill("500000");
      const minusMinButton = page.getByTestId("home-filter-price-min-minus");
      await expect(minusMinButton).toBeVisible();
      await minusMinButton.click();
      await minusMinButton.click();
      const plusMinButton = page.getByTestId("home-filter-price-min-plus");
      await expect(plusMinButton).toBeVisible();
      await plusMinButton.click();
      const minusMaxButton = page.getByTestId("home-filter-price-min-minus");
      await expect(minusMaxButton).toBeVisible();
      await minusMaxButton.click();
      await minusMaxButton.click();
      const plusMaxButton = page.getByTestId("home-filter-price-min-plus");
      await expect(plusMaxButton).toBeVisible();
      await plusMaxButton.click();
      await page.keyboard.press("Escape");
    });
  });
  test("check that home filter body can be applied", async ({ page }) => {
    const bodyFilter = page.getByTestId("home-filter-body");
    await expect(bodyFilter).toBeVisible();
    await bodyFilter.click();
    const sedanOption = page.getByLabel("Седан");
    await expect(sedanOption).toBeVisible();
    await sedanOption.click();
    await page.keyboard.press("Escape");
  });
  test("check that home drive filter can be applied", async ({ page }) => {
    const driveFilter = page.getByTestId("home-filter-drive");
    await expect(driveFilter).toBeVisible();
    await driveFilter.click();
    const AllWheelDrive = page.getByLabel("Повний привід");
    await expect(AllWheelDrive).toBeVisible();
    await AllWheelDrive.click();
    await page.keyboard.press("Escape");
  });
  test("check that home filter brand can be applied", async ({ page }) => {
    const brandFilter = page.getByTestId("home-filter-brand");
    await expect(brandFilter).toBeVisible();
    await brandFilter.click();
    const audiOption = page.getByLabel("Audi");
    await expect(audiOption).toBeVisible();
    await audiOption.click();
    await page.keyboard.press("Escape");
    await page.getByTestId("home-filter-submit").click();
    await expect(page).toHaveURL(/.*catalog.*/);
  });
});

import { expect, test } from "@playwright/test";
import { acceptCookies } from "./helpers/acceptCookies";
import { quizEnter } from "./helpers/quizEnter";

test.beforeEach(async ({ page }) => {
  await acceptCookies(page);
  await quizEnter(page);
});

test.describe("Quiz modal Step 1", () => {
  test("check that quiz page opens correctly", async ({ page }) => {
    const quizTitle = page.getByRole("heading", {
      level: 3,
      name: "Який кузов вам ближчий?",
    });
    await expect(quizTitle).toBeVisible();
    const quizBackButton = page.getByTestId("quiz-back-button");
    await expect(quizBackButton).toBeVisible();
    await quizBackButton.click();
  });

  test("check that car list are displayed", async ({ page }) => {
    const carsList = page.getByTestId("quiz-cars-list");
    const bodyTypeItems = carsList.locator(":scope > div");
    await expect(carsList).toBeVisible();
    await expect(carsList).not.toBeEmpty();
    await expect(bodyTypeItems).toHaveCount(9);
    const nextButton = page.getByTestId("quiz-next-button");
    await expect(nextButton).toBeDisabled();
  });

  test("click on car item, highlighted car, procced to the next step", async ({ page }) => {
    const carsList = page.getByTestId("quiz-cars-list");
    const carItems = carsList.locator(":scope > div");
    const firstCarItem = carItems.first();
    const firstCarItemCheckbox = firstCarItem.getByRole("checkbox");
    await firstCarItemCheckbox.click();
    await expect(firstCarItemCheckbox).toBeChecked();

    const nextButton = page.getByTestId("quiz-next-button");
    await expect(nextButton).toBeEnabled();
    await nextButton.click();
  });
});

test.describe("Quiz modal Step 2", () => {
  test("check that quiz page Step 2 opens correctly", async ({ page }) => {
    const carsList = page.getByTestId("quiz-cars-list");
    const carItems = carsList.locator(":scope > div");
    const firstCarItem = carItems.first();
    await firstCarItem.click();

    const nextButton = page.getByTestId("quiz-next-button");
    await nextButton.click();
    const quizTitle = page.getByRole("heading", {
      level: 3,
      name: "Який двигун оберемо для авто?",
    });
    await expect(quizTitle).toBeVisible();
  });

  test("check that engine types are displayed and clickable", async ({ page }) => {
    const carsList = page.getByTestId("quiz-cars-list");
    const carItems = carsList.locator(":scope > div");
    const firstCarItem = carItems.first();
    await firstCarItem.click();

    const nextButton = page.getByTestId("quiz-next-button");
    await nextButton.click();
    const engineTypesList = page.getByTestId("quiz-engine-list");
    await expect(engineTypesList).toBeVisible();
    const engineTypeItems = engineTypesList.locator(":scope > div");
    const firstEngineTypeItem = engineTypeItems.first();
    const firstEngineTypeItemCheckbox = firstEngineTypeItem.getByRole("checkbox");
    await firstEngineTypeItemCheckbox.click();
    await expect(firstEngineTypeItemCheckbox).toBeChecked();
    const progressBar = page.getByRole("progressbar");
    await expect(progressBar).toHaveAttribute("data-value", "2");
  });
});

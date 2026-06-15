import { expect, test } from "./fixtures/quiz.fixture";

test.describe("Quiz modal Step 1", () => {
  test("check that quiz page opens correctly", async ({ quiz }) => {
    await expect(quiz.stepTitle("Який кузов вам ближчий?")).toBeVisible();
    await expect(quiz.backButton).toBeVisible();
    await quiz.backButton.click();
  });

  test("check that car list are displayed", async ({ quiz }) => {
    await expect(quiz.carsList).toBeVisible();
    await expect(quiz.carsList).not.toBeEmpty();
    await expect(quiz.carItems).toHaveCount(9);
    await expect(quiz.nextButton).toBeDisabled();
  });

  test("click on car item, highlighted car, procced to the next step", async ({ quiz }) => {
    const firstCarItemCheckbox = quiz.carItems.first().getByRole("checkbox");
    await firstCarItemCheckbox.click();
    await expect(firstCarItemCheckbox).toBeChecked();

    await expect(quiz.nextButton).toBeEnabled();
    await quiz.nextButton.click();
  });
});

test.describe("Quiz modal Step 2", () => {
  test.beforeEach(async ({ quiz }) => {
    await quiz.goToEngineStep();
  });

  test("check that quiz page Step 2 opens correctly", async ({ quiz }) => {
    await expect(quiz.stepTitle("Який двигун оберемо для авто?")).toBeVisible();
  });

  test("check that engine types are displayed and clickable", async ({ quiz }) => {
    await expect(quiz.engineList).toBeVisible();

    const firstEngineTypeItemCheckbox = quiz.engineItems.first().getByRole("checkbox");
    await firstEngineTypeItemCheckbox.click();
    await expect(firstEngineTypeItemCheckbox).toBeChecked();

    const progressBar = quiz.page.getByRole("progressbar");
    await expect(progressBar).toHaveAttribute("data-value", "2");
  });
});

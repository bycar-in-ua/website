import { test as base, type Locator, type Page } from "@playwright/test";
import { acceptCookies } from "../helpers/acceptCookies";
import { quizEnter } from "../helpers/quizEnter";

class QuizPage {
  readonly carsList: Locator;
  readonly carItems: Locator;
  readonly engineList: Locator;
  readonly engineItems: Locator;
  readonly nextButton: Locator;
  readonly backButton: Locator;

  constructor(public readonly page: Page) {
    this.carsList = page.getByTestId("quiz-cars-list");
    this.carItems = this.carsList.locator(":scope > div");
    this.engineList = page.getByTestId("quiz-engine-list");
    this.engineItems = this.engineList.locator(":scope > div");
    this.nextButton = page.getByTestId("quiz-next-button");
    this.backButton = page.getByTestId("quiz-back-button");
  }

  stepTitle(name: string) {
    return this.page.getByRole("heading", {
      level: 3,
      name,
    });
  }

  async selectFirstCar() {
    await this.carItems.first().getByRole("checkbox").click();
  }

  /** Step 1 → Step 2 (engine selection) */
  async goToEngineStep() {
    await this.selectFirstCar();
    await this.nextButton.click();
  }
}

export const test = base.extend<{ quiz: QuizPage; }>({
  quiz: async ({ page }, use) => {
    await acceptCookies(page);
    await quizEnter(page);
    await use(new QuizPage(page));
  },
});

export { expect } from "@playwright/test";

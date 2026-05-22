import type { Page } from "@playwright/test";

export async function quizEnter(page: Page) {
  await page.goto("/");
  const quizButton = page.getByRole("button", { name: " Підбір авто " });

  if (await quizButton.isVisible()) {
    await quizButton.click();
  }
}

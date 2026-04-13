import type { Page } from "@playwright/test";

export async function acceptCookies(page: Page) {
  const acceptButton = page.getByRole("button", { name: "Зрозуміло" });

  if (await acceptButton.isVisible()) {
    await acceptButton.click();
  }
}

import { expect, test } from "@playwright/test";
import { acceptCookies } from "./helpers/acceptCookies";

test.describe("About page", () => {
  test("check that header,footer,main exists", async ({ page }) => {
    await page.goto("/about");
    await acceptCookies(page);

    const header = page.getByTestId("bycar-header");
    await expect(header).toBeVisible();
    const footer = page.getByTestId("bycar-footer");
    await expect(footer).toBeVisible();
    const main = page.getByTestId("about-main");
    await expect(main).toBeVisible();
    await expect(main).not.toBeEmpty();
    await expect(main).toContainText("авто");
  });
});

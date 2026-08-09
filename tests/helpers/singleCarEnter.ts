import type { Page } from "@playwright/test";

export const SINGLE_CAR_SLUG = "26-q3-sportback-2019";

export async function singleCarEnter(page: Page, slug: string = SINGLE_CAR_SLUG) {
  await page.goto(`/model/${slug}`);
}

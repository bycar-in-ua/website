import { test as base, type Locator, type Page } from "@playwright/test";
import { acceptCookies } from "../helpers/acceptCookies";
import { singleCarEnter } from "../helpers/singleCarEnter";

class SingleCarPage {
  readonly title: Locator;
  readonly gallery: Locator;
  readonly galleryImages: Locator;
  readonly consultationButton: Locator;
  readonly trimsList: Locator;
  readonly trims: Locator;
  readonly trimsPrice: Locator;
  readonly powerUnitsList: Locator;
  readonly powerUnits: Locator;
  readonly powerUnitPrice: Locator;
  readonly similarCarsSection: Locator;
  readonly similarCars: Locator;

  constructor(public readonly page: Page) {
    this.title = page.locator("h1");
    this.gallery = page.getByTestId("vehicle-gallery");
    this.galleryImages = this.gallery.locator("img");
    this.consultationButton = page
      .locator("button[type='button']", { hasText: "Отримати консультацію" })
      .filter({ visible: true });
    this.trimsList = page.getByTestId("trims-list");
    this.trims = this.trimsList.locator(":scope > div");
    this.trimsPrice = page.getByTestId("trims-price-range");
    this.powerUnitsList = page.getByTestId("power-units-list");
    this.powerUnits = this.powerUnitsList.locator(":scope > div");
    this.powerUnitPrice = page.getByTestId("power-units-price");
    this.similarCarsSection = page.locator("section", { hasText: "Подібні авто" });
    this.similarCars = this.similarCarsSection.locator("[data-slot=\"item\"]");
  }
}

export const test = base.extend<{ singleCar: SingleCarPage; }>({
  singleCar: async ({ page }, use) => {
    await singleCarEnter(page);
    await acceptCookies(page);
    await use(new SingleCarPage(page));
  },
});

export { expect } from "@playwright/test";

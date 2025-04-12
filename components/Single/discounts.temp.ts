/**
 * This is a temporary solution for POC stage.
 * It will be replaced with a real discount system in the future.
 */

import type { AvailableCar } from "./interface";

type Discount = Pick<AvailableCar, "discountPrice" | "discountDescription">;

const touaregDiscountMessage =
  "Знижка 100 000 грн. на авто в наявності. За деталями звертайтесь до спеціаліста";

export const discounts: Record<number, Discount> = Object.freeze({
  5: {
    discountPrice: 2855761,
    discountDescription: touaregDiscountMessage,
  },
  6: {
    discountPrice: 3450124,
    discountDescription: touaregDiscountMessage,
  },
  7: {
    discountPrice: 3604092,
    discountDescription: touaregDiscountMessage,
  },
  8: {
    discountPrice: 3503381,
    discountDescription: touaregDiscountMessage,
  },
  9: {
    discountPrice: 3613677,
    discountDescription: touaregDiscountMessage,
  },
});

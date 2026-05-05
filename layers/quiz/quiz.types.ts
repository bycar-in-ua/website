import type { BodyType } from "@bycar-in-ua/vehicles-sdk";

export const QUIZ_STEPS = {
  BODY: 1,
  ENGINE: 2,
  DRIVE: 3,
  PRICE: 4,
  BRAND: 5,
} as const;

export type QuizStep = (typeof QUIZ_STEPS)[keyof typeof QUIZ_STEPS];

export type BodyTypeOption = {
  value: BodyType;
  label: string;
  subtitle?: string;
  image: string;
  hoverImage: string;
};

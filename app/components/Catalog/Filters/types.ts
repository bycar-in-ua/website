import type { CheckboxGroupItem } from "@nuxt/ui";

export type CheckboxGroupItemWithCount = CheckboxGroupItem
  & {
    label: string;
    count: number;
  };

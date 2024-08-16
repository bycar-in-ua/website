import type { PropType } from "vue";

export const CheckboxGroupProps = {
  options: {
    type: Array as PropType<ICheckboxGroupOption[]>,
  },
  value: {
    type: Array as PropType<string[] | number[]>,
    default: () => [],
  },
  variant: {
    type: String as PropType<"vertical" | "horizontal">,
    default: "horizontal",
  },
};

export interface ICheckboxGroupOption {
  label?: string;
  key: string | number;
  disabled?: boolean;
}

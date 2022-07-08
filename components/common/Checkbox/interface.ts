import { PropType } from "vue";

export const CheckboxProps = {
  checked: {
    type: [Boolean, String] as PropType<boolean | string | undefined>,
    default: undefined,
  },
  value: {
    type: [String, Number] as PropType<string | number>,
    default: "",
  },
  label: {
    type: String as PropType<string>,
    default: "",
  },
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
};

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

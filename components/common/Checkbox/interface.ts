import { PropType } from "vue";

export const CheckboxProps = {
  checked: {
    type: [Boolean, String] as PropType<boolean | string | undefined>,
    default: undefined,
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

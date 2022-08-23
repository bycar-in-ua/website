import { h, defineComponent, PropType, ExtractPropTypes } from "vue";

const infoLineProps = {
  name: {
    type: String as PropType<string>,
    default: "",
  },
  value: {
    type: [String, Number] as PropType<string | number>,
    default: "",
  },
};

export type InfoLineProps = ExtractPropTypes<typeof infoLineProps>;

export const InfoLine = defineComponent({
  name: "InfoLine",
  props: infoLineProps,
  setup(props) {
    return () => {
      if (props.value)
        return h(
          "div",
          { class: "flex py-1 border-b border-dotted justify-between" },
          [
            h("span", { class: "pr-1" }, props.name),
            h("span", { class: "text-right pl-1" }, props.value),
          ],
        );
    };
  },
});

export default InfoLine;

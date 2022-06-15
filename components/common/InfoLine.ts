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
        return h("div", { class: "flex" }, [
          h("span", {}, props.name),
          h("div", { class: "border-b border-dotted flex-grow px-1" }),
          h("span", {}, props.value),
        ]);
    };
  },
});

export default InfoLine;

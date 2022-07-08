<template>
  <div class="bycar-checkbox-group" :class="variant">
    <Checkbox
      v-for="option in options"
      :key="option.key"
      :value="option.key"
      :label="option.label"
      :disabled="option.disabled"
      :checked="value.includes(option.key)"
      @update:checked="checkHandler"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { CheckboxGroupProps } from "./interface";
import Checkbox from "./Checkbox.vue";

export default defineComponent({
  name: "CheckboxGroup",
  props: CheckboxGroupProps,
  components: { Checkbox },
  emits: ["update:value"],
  setup(props, ctx) {
    const checkHandler = (value: boolean, key: string | number) => {
      value
        ? ctx.emit("update:value", [...props.value, key])
        : ctx.emit(
            "update:value",
            props.value.filter((v) => v !== key),
          );
    };

    return {
      checkHandler,
    };
  },
});
</script>

<style lang="postcss">
.bycar-checkbox-group {
  @apply flex flex-wrap items-start gap-2;
  &.vertical {
    @apply flex-col;
  }
  &.horizontal {
    @apply flex-row;
  }
}
</style>

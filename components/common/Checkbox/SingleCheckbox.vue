<template>
  <span
    class="bycar-checkbox"
    :class="disabled ? 'disabled' : ''"
    @click="!disabled && $emit('update:checked', !checked, value)"
  >
    <span
      class="bycar-checkbox__checkmark-wrapper"
      :class="checked ? 'checked' : ''"
    >
      <CheckIcon v-if="checked" class="w-4 text-white" />
    </span>
    {{ label }}
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { CheckboxProps } from "./interface";
import { CheckIcon } from "@heroicons/vue/solid";

export default defineComponent({
  name: "Checkbox",
  props: CheckboxProps,
  components: { CheckIcon },
  emits: ["update:checked"],
});
</script>

<style lang="postcss">
.bycar-checkbox {
  @apply inline-flex items-center cursor-pointer select-none;
  &.disabled {
    .bycar-checkbox__checkmark-wrapper {
      @apply bg-gray-100 border-gray-200;
      &.checked {
        @apply bg-primary opacity-70;
      }
    }
  }
  &__checkmark-wrapper {
    @apply w-4 h-4 border border-subtext-color rounded mr-2 transition-colors relative inline-flex justify-center items-center;
    &.checked {
      @apply bg-primary border-primary;
    }
  }
}
</style>

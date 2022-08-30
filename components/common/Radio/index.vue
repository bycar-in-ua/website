<template>
  <div
    v-for="item in options"
    :key="item.value"
    class="bycar-radio-wrapper flex justify-start items-center cursor-pointer"
    @click="$emit('update:value', item.value)"
  >
    <input
      type="radio"
      :name="groupName"
      :value="item.value"
      :checked="value == item.value"
      class="bycar-radio"
    />
    <span v-text="item.label" class="ml-2" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "RadioInputGroup",
  emits: ["update:value"],
});
</script>

<script setup lang="ts">
export interface IRadioInputProps {
  value: string;
  label: string;
}

interface IProps {
  groupName?: string;
  value: string;
  options: IRadioInputProps[];
}

defineProps<IProps>();
</script>

<style>
.bycar-radio-wrapper {
  &:hover {
    .bycar-radio {
      @apply border-primary;
    }
  }
}
.bycar-radio {
  appearance: none;
  @apply w-4 h-4 rounded-full border border-subtext-color;
  &:checked {
    @apply border-primary border-4;
  }
}
</style>

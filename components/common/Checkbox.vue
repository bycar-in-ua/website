<template>
  <div class="bycar-checkbox">
    <span class="bycar-checkbox__checkmark-wrapper">
      <CheckIcon class="w-4" />
    </span>
    Lorem ipsum
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Checkbox",
});
</script>

<script setup lang="ts">
import { CheckIcon } from "@heroicons/vue/solid";

defineProps<{
  checked: boolean;
  name: string;
}>();
</script>

<style lang="postcss">
.bycar-checkbox {
  @apply flex;
  &__checkmark-wrapper {
  }
}
</style>

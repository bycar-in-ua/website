<script setup lang="ts">
import type { OptionCategoryDto as OptionCategory } from "@bycar-in-ua/common";

const props = defineProps<{ optionCategory: OptionCategory }>();

const baseMaxHeight = "150px";

const open = ref(false);
const maxHeight = ref(baseMaxHeight);

watch(open, (val) => {
  switch (val) {
    case true:
      maxHeight.value = "9999px";
      break;
    default:
      maxHeight.value = baseMaxHeight;
      break;
  }
});

const isLong = computed(() => props.optionCategory.options.length > 5);
</script>

<template>
  <div>
    <h4 class="text-md mb-2 font-bold">
      {{ optionCategory.displayName }}:
    </h4>

    <ul
      class="list-inside relative transition-all long-list"
      :style="{ '--max-height': maxHeight }"
    >
      <li
        v-for="option in optionCategory.options"
        :key="option.id"
        class="list-disc leading-7"
      >
        {{ option.displayName }}
      </li>
      <li
        v-if="isLong"
        class="read-more bottom-0 left-0 right-0 flex justify-center bg-gradient-to-t from-white to-transparent cursor-pointer"
        :class="open ? 'static' : 'absolute'"
        @click="open = !open"
      >
        <UIcon
          name="i-heroicons-chevron-down"
          class="w-10 h-10 p-1 rounded-full transition-all hover:bg-primary"
          :class="open ? 'rotate-180' : 'rotate-0'"
        />
      </li>
    </ul>
  </div>
</template>

<style>
.long-list {
  max-height: var(--max-height);
  @apply overflow-hidden transition-all;
}
</style>

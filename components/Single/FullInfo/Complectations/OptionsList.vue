<template>
  <div>
    <h4 class="text-lg mb-2">{{ optionCategory.displayName }}:</h4>

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
        class="read-more bottom-0 left-0 right-0 bg-gradient-to-t from-white to-transparent cursor-pointer"
        :class="open ? 'static' : 'absolute'"
        @click="open = !open"
      >
        <ChevronDownIcon
          class="read-more-icon w-10 h-10 p-1 border mx-auto rounded-full bg-white transition-all"
          :class="open ? 'rotate-180' : 'rotate-0'"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "OptionsList",
});
</script>

<script setup lang="ts">
import { OptionCategoryDto as OptionCategory } from "@/common/src/dto";
import { ChevronDownIcon } from "@heroicons/vue/24/solid";

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

<style lang="postcss">
.long-list {
  max-height: var(--max-height);
  @apply overflow-hidden transition-all;
}

.read-more {
  &:hover {
    .read-more-icon {
      @apply border-primary;
    }
  }
}
</style>

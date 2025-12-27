<script setup lang="ts">
type Status = "avalible" | "discount" | "prev-model";

const props = defineProps<{ status?: Status }>();

const content: Record<Status, { icon: string; text: string }> = {
  avalible: {
    icon: "i-lucide-clock",
    text: "Доступно зараз",
  },
  discount: {
    icon: "i-lucide-percent",
    text: "Знижка",
  },
  "prev-model": {
    icon: "i-lucide-clock", // TODO: change icon and text
    text: "Доступно зараз",
  },
};
</script>

<template>
  <div
    v-if="props.status"
    class="bg-white text-black text-xs font-semibold border border-gray-100 px-1.5 py-1 flex items-center justify-center gap-1"
  >
    <UIcon :name="content[props.status].icon" class="w-4 h-4" />
    {{ content[props.status].text }}
  </div>
</template>

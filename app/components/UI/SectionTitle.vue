<script setup lang="ts">
defineProps<{
  title?: string[];
  extraLink?: string;
  preset?: "light" | "dark";
}>();
</script>

<template>
  <div class="flex items-end">
    <slot name="title">
      <h2
        class="text-xl sm:text-3xl md:text-5xl font-bold grow"
      >
        <span class="text-primary">{{ title?.[0] }}</span>
        <br>
        <span :class="preset === 'dark' ? 'text-white' : ''">{{ title?.[1] }}</span>
      </h2>
    </slot>

    <slot name="extra">
      <UButton
        v-if="extraLink"
        variant="link"
        icon="i-heroicons-arrow-right"
        trailing
        class=""
        :to="extraLink ?? { name: 'catalog' }"
      >
        Переглянути всі
      </UButton>
    </slot>
  </div>
</template>

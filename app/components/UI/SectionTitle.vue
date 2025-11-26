<script setup lang="ts">
defineProps<{
  title?: string[];
  extraLink?: string;
}>();
</script>

<template>
  <div class="flex items-end mb-10">
    <slot name="title">
      <h2
        class="text-xl sm:text-3xl md:text-5xl font-bold grow"
      >
        <span class="text-primary">{{ title?.[0] }}</span>
        <br>
        {{ title?.[1] }}
      </h2>
    </slot>

    <slot name="extra">
      <UButton
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

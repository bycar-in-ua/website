<script setup lang="ts">
defineProps<{ title?: string;
  extraLink?: string; }>();
</script>

<template>
  <div class="flex items-center mb-7">
    <slot name="title">
      <h2
        class="text-xl sm:text-2xl md:text-3xl font-bold flex-grow"
        v-text="title"
      />
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

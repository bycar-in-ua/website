<script setup lang="ts">
import { twMerge } from "tailwind-merge";

defineProps<{
  title?: string[];
  extraLink?: string;
  headingClass?: string;
}>();
</script>

<template>
  <div class="flex items-end">
    <slot name="title" :title>
      <h2
        :class="twMerge('text-3xl md:text-5xl font-bold grow text-default', headingClass)"
      >
        <span class="text-primary">{{ title?.[0] }}</span>
        <br>
        {{ title?.[1] }}
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

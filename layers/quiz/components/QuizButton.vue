<script setup lang="ts">
import type { ButtonProps } from "@nuxt/ui";

const props = defineProps<ButtonProps>();
</script>

<template>
  <UButton class="md:text-xl" v-bind="props">
    <slot />
  </UButton>
</template>

<script setup lang="ts">
const emit = defineEmits<{ remove: []; }>();
</script>

<template>
  <UBadge class="bg-gray-50 font-semibold">
    <slot />

    <template #trailing>
      <UIcon
        name="i-lucide-x"
        class="cursor-pointer size-4.5"
        @click="emit('remove')"
      />
    </template>
  </UBadge>
</template>

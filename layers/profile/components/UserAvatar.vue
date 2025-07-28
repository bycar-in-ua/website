<script setup lang="ts">
defineProps<{ avatar?: string }>();

const cdnImage = useCdnImage();
</script>

<template>
  <UAvatar v-if="avatar" :src="cdnImage(avatar, 'medium')" />

  <slot v-else name="icon">
    <UIcon
      name="i-heroicons-user-circle-solid"
      v-bind="$attrs"
      class="text-gray-400"
    />
  </slot>
</template>

<script setup lang="ts">
defineProps<{ avatar?: string }>();

const cdnImage = useCdnImage();
</script>

<template>
  <UAvatar v-if="avatar" :src="cdnImage(avatar, 'medium')" />
  <UIcon v-else name="i-heroicons-solid-user-circle" class="bg-gray-400" />
</template>

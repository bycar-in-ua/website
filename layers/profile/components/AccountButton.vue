<script setup lang="ts">
const authStore = useAuthStore();
</script>

<template>
  <UButton to="/profile" variant="link" color="neutral">
    <UserAvatar :avatar="authStore.user?.avatar" class="w-6 h-6" />
    Акаунт
  </UButton>
</template>

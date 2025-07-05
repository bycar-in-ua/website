<script setup lang="ts">
const authStore = useAuthStore();
</script>

<template>
  <UButton
    to="/profile"
    variant="link"
    color="neutral"
    :icon="authStore.user ? undefined : 'i-heroicons-user'"
    :avatar="
      authStore.user?.avatar ? { src: authStore.user.avatar } : undefined
    "
  >
    Акаунт
  </UButton>
</template>

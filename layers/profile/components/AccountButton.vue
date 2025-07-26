<script setup lang="ts">
const authStore = useAuthStore();
const profileStore = useProfileStore();
</script>

<template>
  <div class="flex items-center">
    <UButton
      v-if="profileStore.profile?.savedCars?.length"
      icon="i-heroicons-solid-heart"
      variant="ghost"
      color="neutral"
      class="text-muted"
      title="Збережені авто"
      :to="{ name: 'profile' }"
    />

    <UButton to="/profile" variant="link" color="neutral">
      <UserAvatar :avatar="authStore.user?.avatar" class="w-6 h-6 text-muted" />
      Акаунт
    </UButton>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
</script>

<template>
  <UButton :to="{ name: 'profile-personal' }" variant="link" v-bind="$attrs">
    <template #leading>
      <UserAvatar :avatar="authStore.user?.avatar" class="size-5">
        <template #icon>
          <UIcon
            v-if="authStore.authenticated"
            name="i-heroicons-user-solid"
            class="size-5"
          />
          <UIcon v-else name="i-heroicons-user" class="size-5" />
        </template>
      </UserAvatar>
    </template>
  </UButton>
</template>

<script setup lang="ts">
const { user, loggedIn } = useUserSession();
</script>

<template>
  <UButton :to="{ name: 'profile-personal' }" variant="link" v-bind="$attrs">
    <template #leading>
      <UserAvatar :avatar="user?.data?.avatar" class="size-5">
        <template #icon>
          <UIcon
            v-if="loggedIn"
            name="i-heroicons-user-solid"
            class="size-5"
          />
          <UIcon v-else name="i-heroicons-user" class="size-5" />
        </template>
      </UserAvatar>
    </template>
  </UButton>
</template>

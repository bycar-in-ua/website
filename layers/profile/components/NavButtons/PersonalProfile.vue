<script setup lang="ts">
import { UserFilled } from "~/components/UI/Icons";

const { loggedIn } = useUserSession();
</script>

<template>
  <UButton
    :to="{ name: 'profile-personal' }"
    variant="link"
    color="secondary"
    :ui="{ leadingIcon: 'size-6 lg:size-5' }"
    :leading-icon="loggedIn ? UserFilled : 'i-lucide-user'"
  />
</template>

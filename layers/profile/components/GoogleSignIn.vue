<script setup lang="ts">
import Google from "~/components/UI/Icons/Google.vue";

const { googleSignIn, loading } = useGoogleSignIn();
</script>

<template>
  <UButton
    variant="outline"
    color="neutral"
    size="xl"
    block
    :loading="loading"
    @click="
      () => {
        googleSignIn();
      }
    "
  >
    <Google />
    <slot> Увійти через Google </slot>
  </UButton>
</template>

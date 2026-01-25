<script setup lang="ts">
import Google from "~/components/UI/Icons/Google.vue";

const route = useRoute();

const loading = ref(false);

function loginWithGoogle() {
  loading.value = true;
  const redirect = route.query.redirect?.toString() || "/profile/personal";
  navigateTo(`/auth/google?redirect=${encodeURIComponent(redirect)}`, { external: true });
}
</script>

<template>
  <UButton
    variant="outline"
    block
    :loading="loading"
    @click="loginWithGoogle"
  >
    <Google />
    <slot>Увійти через Google</slot>
  </UButton>
</template>

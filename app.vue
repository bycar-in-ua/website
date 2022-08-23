<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const { afterEach } = useRouter();

if (process.client) {
  afterEach(() => {
    document.body.scrollTo(0, 0);
  });
}
</script>

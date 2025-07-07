<script setup lang="ts">
import Google from "@/components/UI/Icons/Google.vue";
</script>

<template>
  <UButton variant="outline" color="neutral" size="xl" block>
    <Google />
    <slot> Увійти через Google </slot>
  </UButton>
</template>

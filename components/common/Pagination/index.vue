<template>
  <div class="flex">
    <a
      v-for="i in 5"
      :key="i"
      :href="`#${i}`"
      class="text-primary hover:underline mx-2"
      >{{ i }}</a
    >
  </div>
</template>

<script lang="ts">
export default {
  name: "Pagination",
};
</script>

<script setup lang="ts"></script>

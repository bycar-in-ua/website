<template>
  <h1 class="mb-5 font-bold text-2xl" v-text="title" />
</template>

<script lang="ts">
export default {
  name: "SingleTitle",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
};
</script>

<script setup lang="ts"></script>

<template>
  <h2 class="text-2xl text-center font-bold mb-5" v-text="title" />
</template>

<script lang="ts">
export default {
  name: "SectionTitle",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

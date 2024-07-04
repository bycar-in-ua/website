<template>
  <div class="card">
    <h3 v-if="title" v-text="title" class="text-xl font-bold mb-4" />
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

export default defineComponent({
  name: "Card",
  props: {
    title: {
      type: String as PropType<string>,
    },
  },
});
</script>

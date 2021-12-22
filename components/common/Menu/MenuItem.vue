<template>
  <router-link
    :to="item.route"
    class="mx-2 font-bold hover:text-primary transition-all"
    active-class="text-primary"
  >
    {{ item.label }}
  </router-link>
</template>

<script lang="ts">
export default {
  name: "MenuItem",
};
</script>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  item: {
    type: Object,
    requierd: true,
  },
});
</script>

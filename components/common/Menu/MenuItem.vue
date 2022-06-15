<template>
  <NuxtLink
    :to="item.route"
    class="lg:mx-4 xl:mx-8 hover:text-primary transition-all py-4"
    active-class="text-primary"
    :exact="item.exact"
  >
    {{ item.label }}
  </NuxtLink>
</template>

<script lang="ts">
export default {
  name: "MenuItem",
};
</script>

<script setup lang="ts">
defineProps({
  item: {
    type: Object,
    requierd: true,
  },
});
</script>

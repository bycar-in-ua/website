<template>
  <div class="bycar-container flex gap-4">
    <Sidebar class="w-80 flex-shrink-0" />
    <List />
  </div>
</template>

<script lang="ts">
export default {
  name: "Catalog",
};
</script>

<script setup lang="ts">
import Sidebar from "@/components/Catalog/Sidebar.vue";
import List from "@/components/Catalog/List.vue";
</script>

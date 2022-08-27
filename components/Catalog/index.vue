<template>
  <Sidebar />
  <List />
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

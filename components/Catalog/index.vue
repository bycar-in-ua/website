<script setup lang="ts">
import Sidebar from "@/components/Catalog/Sidebar.vue";
import List from "@/components/Catalog/List.vue";
import Headline from "./Headline.vue";
</script>

<template>
  <Headline />
  <div class="lg:flex gap-10">
    <Sidebar />
    <List />
  </div>
</template>

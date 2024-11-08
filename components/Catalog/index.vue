<script setup lang="ts">
import Sidebar from "@/components/Catalog/Sidebar.vue";
import List from "@/components/Catalog/List.vue";
import Headline from "./Headline.vue";
import AppliedFilters from "./AppliedFilters.vue";
</script>

<template>
  <Headline class="mb-6" />
  <AppliedFilters class="mb-6" />
  <div class="lg:flex gap-10">
    <Sidebar />
    <List />
  </div>
</template>

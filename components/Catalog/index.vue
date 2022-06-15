<template>
  <div class="bycar-container md:flex">
    <!-- <Sidebar class="basis-80 flex-shrink-0 lg:pl-10 lg:-ml-5" /> -->
    <List />
  </div>
</template>

<script lang="ts">
export default {
  name: "Catalog",
};
</script>

<script setup lang="ts">
// import Sidebar from "@/components/Catalog/Sidebar.vue";
import List from "@/components/Catalog/List.vue";
</script>

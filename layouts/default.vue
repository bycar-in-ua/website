<template>
  <n-layout style="min-height: 100vh">
    <n-layout-header>
      <Hader />
    </n-layout-header>
    <n-layout-content content-style="padding: 24px;">
      <slot />
    </n-layout-content>
    <n-layout-footer>Chengfu Road</n-layout-footer>
  </n-layout>
</template>

<script lang="ts">
export default {
  name: "DefaultLayout",
};
</script>

<script setup lang="ts">
import { NLayout, NLayoutHeader, NLayoutFooter } from "naive-ui";
import Hader from "~~/components/Hader/index.vue";
</script>

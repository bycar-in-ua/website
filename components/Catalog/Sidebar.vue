<template>
  <div class="bg-white p-4 my-4 rounded border border-gray-200">
    <h3 class="text-center pb-2">{{ $t("filters") }}</h3>

    <Checkbox :value="true" name="test" />
  </div>
</template>

<script lang="ts">
export default {
  name: "CatalogSidebar",
};
</script>

<script setup lang="ts">
import Checkbox from "@/components/common/Checkbox.vue";
</script>

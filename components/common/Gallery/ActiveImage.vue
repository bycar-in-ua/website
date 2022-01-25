<template>
  <div class="overflow-hidden rounded-lg w-full">
    <img
      :src="item.source"
      :alt="item.alt"
      class="object-cover w-full h-full"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { GalleryItem } from "../interface";

export default defineComponent({
  name: "ActiveImage",
  props: {
    item: Object as PropType<GalleryItem>,
  },
});
</script>

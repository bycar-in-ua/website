<template>
  <div v-show="activeTabKey === name" class="bycar-tab-pane p-2">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, inject } from "vue";

export const tabPaneProps = {
  title: [String] as PropType<string>,
  name: [String, Number] as PropType<string | number>,
} as const;

export default defineComponent({
  __TAB_PANE__: true,
  name: "TabPane",
  alias: ["TabPanel"],
  props: tabPaneProps,
  setup() {
    return { activeTabKey: inject("activeTabKey") };
  },
});
</script>

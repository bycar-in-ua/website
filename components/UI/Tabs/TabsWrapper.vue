<script lang="ts">
import { ref, defineComponent, type PropType, provide } from "vue";
import { flatten } from "@/utils/flatten";

export const tabsProps = {
  title: [String] as PropType<string>,
  key: [String, Number] as PropType<string | number>,
  defaultActiveTab: [String, Number] as PropType<string | number>,
  tabsJustify: {
    type: String as PropType<"start" | "center" | "end">,
    default: "center",
  },
} as const;

export default defineComponent({
  name: "Tabs",
  props: tabsProps,
  setup(props, { slots }) {
    const tabs = flatten(slots.default()).filter(
      (t) => (t.type as any).__TAB_PANE__ === true,
    );

    const activeTab = ref(undefined);

    if (props.defaultActiveTab) {
      activeTab.value = props.defaultActiveTab;
    } else {
      activeTab.value = tabs[0]?.props?.key;
    }

    const switchTab = (key) => {
      activeTab.value = key;
    };

    provide("activeTabKey", activeTab);

    return {
      tabs,
      activeTab,
      switchTab,
    };
  },
});
</script>

<template>
  <div class="bycar-tabs">
    <div
      class="w-full flex"
      :style="{
        justifyContent: tabsJustify,
      }"
    >
      <div class="bycar-tabs-header" :class="tabsJustify">
        <div
          v-for="tab in tabs"
          :key="tab.key"
          class="bycar-tab"
          :class="activeTab === tab.props.name ? 'active' : ''"
          @click="switchTab(tab.props.name)"
        >
          {{ tab.props.title }}
        </div>
      </div>
    </div>
    <component
      :is="tab"
      v-for="tab in tabs"
      :key="tab.key"
      v-bind="tab.props"
    />
  </div>
</template>

<style lang="postcss">
.bycar-tabs-header {
  @apply flex overflow-x-auto relative px-4;
  &::-webkit-scrollbar {
    display: none;
  }
}
.bycar-tab {
  @apply px-4 py-2 cursor-pointer border-b hover:border-primary hover:text-primary transition-all whitespace-nowrap;
  &.active {
    @apply border-primary text-primary;
  }
}
</style>

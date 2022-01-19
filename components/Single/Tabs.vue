<template>
  <Tabs>
    <TabPane
      v-for="tab in tabs"
      :key="tab.name"
      :name="tab.name"
      :title="tab.title"
    >
      {{ tab.content }}
    </TabPane>
  </Tabs>
</template>

<script lang="ts">
export default {
  name: "SingleTabs",
};
</script>

<script setup lang="ts">
import { Tabs, TabPane } from "@/components/common/Tabs";

const tabs = [
  {
    name: 1,
    content: "Общее",
    title: "Общие характеристики",
  },
  {
    name: 2,
    content: "Комплектации",
    title: "Комплектации и цены",
  },
];
</script>

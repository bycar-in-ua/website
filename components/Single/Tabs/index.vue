<template>
  <Tabs default-active-tab="general">
    <TabPane name="general" title="Загальні характеристики">
      <General :car="car" />
    </TabPane>
    <TabPane name="complectations" title="Комплектації та ціни">
      Lorem ipsum dolor sit amet.
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
import { VehicleDto as Car } from "@/common";
import General from "./General.vue";

defineProps<{ car: Car }>();
</script>

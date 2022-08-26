<template>
  <Tabs default-active-tab="general">
    <TabPane name="general" :title="$t('vehicle.generalCharacteristics.title')">
      <General :car="car" />
    </TabPane>
    <TabPane
      name="complectations"
      :title="$t('vehicle.complectationsAndPrices')"
    >
      <Complectations :car="car" />
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
import { VehicleView as Car } from "@/common";
import General from "./General.vue";
import Complectations from "./Complectations/index.vue";

defineProps<{ car: Car }>();

const { $t } = useNuxtApp();
</script>

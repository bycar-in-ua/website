<script setup lang="ts">
import Collapsible from "@/components/UI/Collapsible.vue";
import type { PowerUnit, Vehicle } from "@bycar-in-ua/sdk";
import type { InfoBlock } from "./interface";
import { getGeneralInfoBlock, getDimensionsBlock, getWeightsAndVolumesBlock, getPetrolEngineBlock, getElectricEngineBlock, getTransmissionBlock } from "./helpers";

const props = defineProps<{ car: Vehicle; powerUnit?: PowerUnit | null }>();

const { t } = useI18n();

const infoBlocks = computed<InfoBlock[][]>(() => {
  const general = getGeneralInfoBlock(props.car, t);
  const dimensions = getDimensionsBlock(props.car, t);
  const weightsAndVolumes = getWeightsAndVolumesBlock(props.car, t);

  const engine = props.powerUnit?.engine
    ? props.powerUnit.engine.isElectric
      ? getElectricEngineBlock(props.powerUnit.engine, t)
      : getPetrolEngineBlock(props.powerUnit.engine, t)
    : undefined;

  const trnasmission = props.powerUnit?.transmission ? getTransmissionBlock(props.powerUnit.transmission, t) : undefined;

  return [[general, dimensions, weightsAndVolumes], [engine, trnasmission].filter(Boolean) as InfoBlock[]];
});
</script>

<template>
  <section class="grid grid-cols-2 gap-10">
    <div v-for="(blocks, i) in infoBlocks" :key="i">
      <Collapsible
        v-for="(block, j) in blocks"
        :key="j"
        :default-open="block.defaultOpen"
        :title="block.title"
      >
        <template #content>
          <template v-for="(item, k) in block.items" :key="k">
            <div class="flex gap-4 justify-between text-sm">
              <span class="text-slate-600 flex-shrink-0 max-w-[80%]">{{ item.title }}:</span>
              <span class="text-right">{{ item.value }}</span>
            </div>
            <UDivider class="my-4 last-of-type:hidden" />
          </template>
        </template>
      </Collapsible>
    </div>
  </section>
</template>

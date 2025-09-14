<script setup lang="ts">
import type { Complectation, PowerUnit, Vehicle } from "@bycar-in-ua/sdk";
import { OptionsPublicService } from "@bycar-in-ua/sdk";
import CollapsibleTitle from "~/components/UI/CollapsibleTitle.vue";
import groupBy from "lodash/groupBy.js";
import SectionTitle from "./SectionTitle.vue";
import type { InfoBlock } from "./interface";
import {
  getGeneralInfoBlock,
  getDimensionsBlock,
  getWeightsAndVolumesBlock,
  getPetrolEngineBlock,
  getElectricEngineBlock,
  getTransmissionBlock,
} from "./helpers";

const props = defineProps<{
  car: Vehicle;
  complectation?: Complectation;
  powerUnit?: PowerUnit | null;
}>();

const config = useRuntimeConfig();

const optionsService = OptionsPublicService.create(config.public.apiHost);

const { data: optionCategories } = useAsyncData(
  "option-categories",
  async () => {
    const optCats = await optionsService.getAllOptionCategories();

    return new Map(optCats.map((cat) => [cat.id, cat.displayName]));
  },
  {
    default: () => new Map(),
    getCachedData(key, nuxtApp) {
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
  },
);

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

  const trnasmission = props.powerUnit?.transmission
    ? getTransmissionBlock(props.powerUnit.transmission, t)
    : undefined;

  return [
    [
      general, dimensions, weightsAndVolumes,
    ],
    [engine, trnasmission].filter(Boolean) as InfoBlock[],
  ];
});

const optionsByCategories = computed(() => {
  if (!props.complectation?.options?.length) return [];

  const optionsByCategories = groupBy(
    props.complectation.options,
    "categoryId",
  );

  const optionsByCategoriesArray = Object.entries(optionsByCategories);

  return [
    optionsByCategoriesArray.splice(
      0,
      Math.floor(optionsByCategoriesArray.length / 2),
    ),
    optionsByCategoriesArray,
  ];
});
</script>

<template>
  <section class="grid md:grid-cols-2 gap-x-10">
    <div v-for="(blocks, i) in infoBlocks" :key="i">
      <template v-for="(block, j) in blocks" :key="j">
        <UCollapsible :default-open="block.defaultOpen">
          <template #default="{ open }">
            <CollapsibleTitle :open="open" :title="block.title" />
          </template>

          <template #content>
            <template v-for="(item, k) in block.items" :key="k">
              <div class="flex gap-4 justify-between text-sm">
                <span class="text-slate-600 max-w-[80%] w-full">
                  {{ item.title }}:
                </span>
                <span class="text-right">{{ item.value }}</span>
              </div>
            </template>
          </template>
        </UCollapsible>
        <USeparator class="my-4 last-of-type:hidden" />
      </template>
    </div>

    <SectionTitle class="md:col-span-2 mt-6">
      {{ t("options.title") }}
      <USeparator class="my-5" />
    </SectionTitle>

    <div v-for="(blocks, i) in optionsByCategories" :key="i">
      <template v-for="[catId, options] in blocks" :key="catId">
        <UCollapsible :default-open="false">
          <template #default="{ open }">
            <CollapsibleTitle
              :open="open"
              :title="optionCategories.get(Number(catId))"
            />
          </template>

          <template #content>
            <ul class="list-disc list-inside">
              <li
                v-for="option in options"
                :key="option.id"
                class="text-sm my-2"
              >
                {{ option.displayName }}
              </li>
            </ul>
          </template>
        </UCollapsible>
        <USeparator class="my-4 last-of-type:hidden" />
      </template>
    </div>
  </section>
</template>

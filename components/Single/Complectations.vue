<script setup lang="ts">
import type { Complectation } from "@bycar-in-ua/sdk";
import { ComplectationKey } from "./interface.js";
import SectionTitle from "./SectionTitle.vue";
import Control from "./Control.vue";
import { getPriceRange } from "../UI/CarCard/helpers.js";

defineProps<{ compectations: Complectation[] }>();

const activeComplectation = inject(ComplectationKey);
</script>

<template>
  <section>
    <SectionTitle class="mb-4">
      Комплектації та ціни
    </SectionTitle>

    <div class="flex gap-2">
      <Control
        v-for="compectation in compectations"
        :key="compectation.id"
        :title="compectation.displayName"
        :value="getPriceRange([compectation])"
        :active="compectation.id === activeComplectation?.complectation.value?.id"
        @click="() => activeComplectation?.setActiveComplectation(compectation)"
      />
    </div>
  </section>
</template>

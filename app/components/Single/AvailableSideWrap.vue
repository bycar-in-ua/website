<script setup lang="ts">
import type { AvailableVehicleView } from "@bycar-in-ua/vehicles-sdk";
import { getPowerUnitTitle } from "~/components/Single/helpers";
import WrapTitle from "./WrapTitle.vue";

const props = defineProps<{ car: AvailableVehicleView; }>();

const { t } = useI18n();

const carTitle = computed(() => {
  const brand = props.car.brand?.displayName || "";
  const model = props.car.model || "";
  const trim = props.car.trim?.displayName || "";
  return `${brand} ${model} ${trim}`.trim();
});

const powerUnitTitle = computed(() => {
  const powerUnit = props.car.trim?.powerUnits?.[0];

  if (!powerUnit) return "";

  return getPowerUnitTitle(powerUnit);
});

const listPrice = computed(() => props.car.trim?.powerUnits?.[0]?.price);

const hasDiscount = computed(() =>
  listPrice.value && props.car.price && listPrice.value > props.car.price,
);

const formattedPrice = computed(() =>
  formatCurrency(props.car.price, {
    currency: "UAH",
    currencyDisplay: "narrowSymbol",
    trailingZeroDisplay: "stripIfInteger",
  }),
);

const formattedListPrice = computed(() =>
  listPrice.value
    ? formatCurrency(listPrice.value, {
        currency: "UAH",
        currencyDisplay: "narrowSymbol",
        trailingZeroDisplay: "stripIfInteger",
      })
    : "",
);
</script>

<template>
  <UCard :ui="{ root: 'max-w-102', body: 'border-gray-200', footer: 'sm:p-6' }">
    <WrapTitle :brand="car.brand" :title="carTitle" :subtitle="powerUnitTitle" />

    <div v-if="car.dealer" class="inline-flex gap-1 items-center my-4 text-dimmed">
      <UIcon name="i-lucide-map-pin" class="size-4 shrink-0" />
      {{ [car.dealer.location, car.dealer.name].filter(Boolean).join(", ") }}
    </div>

    <div class="flex items-center justify-between">
      <div class="flex flex-col gap-2">
        <div v-if="hasDiscount" class="flex items-center gap-2">
          <span class="text-base font-medium text-dimmed line-through">
            {{ formattedListPrice }}
          </span>
          <UBadge color="neutral" variant="subtle" size="sm">
            <UIcon name="i-lucide-percent" class="size-3.5" />
            {{ t('vehicle.discount') }}
          </UBadge>
        </div>
        <p class="text-xl font-bold uppercase">
          {{ formattedPrice }}
        </p>
      </div>

      <div class="flex gap-2">
        <UButton
          icon="i-lucide-bookmark"
          color="neutral"
          variant="outline"
          class="rounded-full"
          :aria-label="t('actions.addToFavorites')"
        />
        <UButton
          icon="i-lucide-scale"
          color="neutral"
          variant="outline"
          class="rounded-full"
          :aria-label="t('actions.compare')"
        />
      </div>
    </div>

    <template #footer>
      <div class="flex flex-col gap-2">
        <UButton
          block
          size="xl"
          color="primary"
          variant="solid"
          class="font-semibold"
        >
          Отримати цю пропозицію
        </UButton>
        <UButton
          block
          size="xl"
          color="primary"
          variant="outline"
          class="font-semibold"
        >
          Запитати інші пропозиції
        </UButton>
      </div>
      <p class="text-xs text-dimmed text-center mt-3">
        Кінцева вартість залежить від обраного дилера та актуальних акцій на момент угоди
      </p>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import type { AvailableVehicleView } from "@bycar-in-ua/vehicles-sdk";
import { useCarRequestSlideover } from "#layers/crm/composables/useCarRequestSlideover";
import WrapTitle from "~/components/UI/WrapTitle.vue";

type Props = {
  car: AvailableVehicleView;
  carTitle: string;
  powerUnitTitle: string;
  currentPrice: string;
  basePrice?: string;
};

defineProps<Props>();

const { t } = useI18n();

const carRequestSlideover = useCarRequestSlideover();
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
        <div v-if="basePrice" class="flex items-center gap-2">
          <span class="text-base font-medium text-dimmed line-through">
            {{ basePrice }}
          </span>
          <UBadge color="neutral" variant="subtle" size="sm">
            <UIcon name="i-lucide-percent" class="size-3.5" />
            {{ t('vehicle.discount') }}
          </UBadge>
        </div>
        <p class="text-xl font-bold uppercase">
          {{ currentPrice }}
        </p>
      </div>

      <div class="flex gap-2">
        <UButton
          icon="i-lucide-bookmark"
          color="neutral"
          variant="outline"
          class="rounded-full"
          title="Додати у обране"
        />
        <!-- <UButton
          icon="i-lucide-scale"
          color="neutral"
          variant="outline"
          class="rounded-full"
          :aria-label="t('actions.compare')"
        /> -->
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
          @click="carRequestSlideover.open({
            vehicleId: car.vehicleId,
            availableVehicleId: car.id,
            trimId: car.trim?.id,
            powerUnitId: car.trim?.powerUnits?.[0]?.id,
            direct: true,
          })"
        >
          Отримати цю пропозицію
        </UButton>

        <UButton
          block
          size="xl"
          color="primary"
          variant="outline"
          class="font-semibold"
          @click="carRequestSlideover.open({
            vehicleId: car.vehicleId,
            availableVehicleId: car.id,
            trimId: car.trim?.id,
            powerUnitId: car.trim?.powerUnits?.[0]?.id,
            direct: false,
          })"
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

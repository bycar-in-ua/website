<script setup lang="ts">
import { Car } from "~/components/UI/Icons";
import QuickContactModal from "./QuickContactModal.vue";

defineProps<{
  carId: number;
  carTitle?: string;
  availableVehiclesCount?: number;
}>();

const overlay = useOverlay();

const ContactModal = overlay.create(QuickContactModal);

function availableVehiclesCta() {
  document?.getElementById("available-cars")?.scrollIntoView({ behavior: "smooth" });
}
</script>

<template>
  <div class="flex flex-wrap sm:flex-nowrap gap-2">
    <UButton
      label="Отримати консультацію"
      size="lg"
      :ui="{
        base: 'sm:order-last basis-full sm:basis-auto justify-center',
        label: 'tracking-normal sm:tracking-[unset]',
      }"
      @click="ContactModal.open()"
    />

    <SaveCarButton
      :car-id="carId"
      :title="carTitle"
      class="flex-grow sm:flex-auto basis-[calc(50%-0.5rem)]"
      :button-props="{
        size: 'lg',
        ui: {
          base: 'justify-center px-1 sm:px-3 gap-1 sm:gap-2',
          label: 'tracking-normal sm:tracking-[unset] sm:hidden',
        },
      }"
    />

    <UChip
      v-if="availableVehiclesCount"
      color="error"
      size="3xl"
      :text="availableVehiclesCount"
      class="flex-grow sm:flex-auto basis-[calc(50%-0.5rem)]"
      :ui="{
        base: 'px-1 py-2',
      }"
    >
      <UButton
        label="Авто в наявності"
        variant="outline"
        color="primary"
        size="lg"
        :ui="{
          base: 'w-full justify-center px-1 sm:px-3 gap-1 sm:gap-2',
          label: 'tracking-normal sm:tracking-[unset]',
          leadingIcon: 'sm:hidden',
        }"
        @click="availableVehiclesCta"
      >
        <template #leading>
          <Car class="sm:hidden size-5" />
        </template>
      </UButton>
    </UChip>
  </div>
</template>

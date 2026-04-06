<script setup lang="ts">
import type { LeadProposalView } from "@bycar-in-ua/crm-sdk";
import { getPowerUnitTitle } from "~/components/Single/helpers";

const props = defineProps<{ proposal: LeadProposalView; }>();

defineEmits<{ accept: []; }>();

function getAvailabilityLabel(availability: LeadProposalView["availability"]) {
  switch (availability) {
    case "dealer_stock":
      return "В наявності у дилера";
    case "domestic_stock":
      return "Склад в Україні";
    case "foreign_stock":
      return "Склад закордоном";
    case "shipping":
      return "В дорозі";
    case "factory_order":
      return "Під замовлення";
    default:
      return "Доступність уточнюється";
  }
}

function formatProposalPrice(price: number) {
  return formatCurrency(price, {
    currency: "UAH",
    currencyDisplay: "narrowSymbol",
    trailingZeroDisplay: "stripIfInteger",
  });
}

const dealerName = computed(() => {
  return [props.proposal.dealer.location, props.proposal.dealer.name]
    .filter(Boolean)
    .join(", ");
});
</script>

<template>
  <div class="flex flex-col gap-3 md:flex-row md:items-center">
    <div class="flex min-w-0 flex-1 items-center">
      <div class="h-12 w-16 shrink-0 overflow-hidden me-3">
        <CdnImage
          :src="proposal.vehicle?.image?.path"
          size="small"
          :densities="['small:1x', 'medium:2x']"
          class="h-full w-full object-cover"
        />
      </div>

      <div class="min-w-0 text-sm font-bold text-gray-900">
        <p class="truncate">
          {{ proposal.vehicle.brand?.displayName }} {{ props.proposal.vehicle.model }} {{ proposal.vehicle.trim?.displayName }}
        </p>
        <p class="truncate">
          {{ proposal.vehicle.trim?.powerUnits?.[0] && getPowerUnitTitle(proposal.vehicle.trim?.powerUnits?.[0]) }}
        </p>
      </div>
    </div>

    <div class="flex flex-col gap-4 md:w-auto md:min-w-0 md:flex-row md:items-center md:justify-end">
      <UTooltip :text="dealerName" :content="{ align: 'center', side: 'top' }">
        <span class="truncate text-xs font-medium md:max-w-32 cursor-default">
          {{ dealerName }}
        </span>
      </UTooltip>

      <span class="inline-flex w-fit items-center border border-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-700">
        {{ getAvailabilityLabel(proposal.availability) }}
      </span>

      <span class="text-sm font-bold md:min-w-28">
        {{ formatProposalPrice(proposal.price) }}
      </span>
    </div>

    <UButton
      label="Обрати це авто"
      variant="outline"
      size="sm"
      @click="$emit('accept')"
    />
  </div>
</template>

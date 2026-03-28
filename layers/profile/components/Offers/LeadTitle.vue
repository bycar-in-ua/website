<script setup lang="ts">
import type { LeadView } from "@bycar-in-ua/crm-sdk";
import type { PowerUnitView } from "@bycar-in-ua/vehicles-sdk";
import type { BadgeProps } from "@nuxt/ui";
import { formatDate } from "#shared/date";
import { getPowerUnitTitle } from "~/components/Single/helpers";
import WrapTitle from "~/components/UI/WrapTitle.vue";

const props = defineProps<{
  lead: LeadView;
  open?: boolean;
}>();

const leadTitle = computed(() => {
  const sourceVehicle = props.lead.vehicle;
  const brand = sourceVehicle?.brand?.displayName ?? "";
  const model = sourceVehicle?.model ?? "";
  const trim = props.lead.vehicle?.trims?.[0]?.displayName ?? "";

  return [
    brand, model, trim,
  ].filter(Boolean).join(" ").trim() || "Авто за вашим запитом";
});

const leadSubtitle = computed(() => {
  const powerUnit = props.lead.vehicle?.trims?.[0]?.powerUnits?.[0];

  if (!powerUnit) return "";

  return getPowerUnitTitle(powerUnit as PowerUnitView);
});

const formattedCreatedAt = computed(() => formatDate(props.lead.createdAt));

const formattedDeadline = computed(() => {
  if (!props.lead.resolutionDeadline) {
    return "";
  }

  return formatDate(props.lead.resolutionDeadline, true);
});

const statusMeta = computed<Pick<BadgeProps, "label" | "color">>(() => {
  switch (props.lead.status) {
    case "offers_received":
      return {
        label: "Готово до вибору",
        color: "info",
      };
    case "resolved":
      return {
        label: "Пропозицію прийнято",
        color: "success",
      };
    case "canceled":
      return {
        label: "Протерміновано",
        color: "error",
      };
    default:
      return {
        label: "Шукаємо авто",
        color: "warning",
      };
  }
});
</script>

<template>
  <div
    class="flex w-full flex-col gap-4 px-4 py-4 text-left transition-colors md:flex-row md:items-center md:justify-between md:px-5"
  >
    <WrapTitle
      :brand="lead.vehicle?.brand"
      :title="leadTitle"
      :subtitle="leadSubtitle"
      size="sm"
    />

    <div class="flex flex-wrap items-center gap-6 md:shrink-0 md:justify-end">
      <UBadge :label="statusMeta.label" :color="statusMeta.color" />

      <UTooltip text="Дата створення" :content="{ align: 'end', side: 'top' }" arrow>
        <span class="inline-flex items-center gap-1 text-sm font-semibold text-gray-700 cursor-default">
          <UIcon name="i-lucide-clock-3" class="size-4 shrink-0 text-gray-300" />
          {{ formattedCreatedAt }}
        </span>
      </UTooltip>

      <UTooltip
        v-if="formattedDeadline && lead.status === 'pending'"
        text="Очікування пропозицій"
        :content="{ align: 'end', side: 'top' }"
        arrow
      >
        <span class="inline-flex items-center gap-1 text-sm font-semibold text-gray-700 cursor-default">
          <UIcon name="i-lucide-calendar-search" class="size-4 shrink-0 text-gray-300" />
          {{ formattedDeadline }}
        </span>
      </UTooltip>

      <UTooltip
        v-if="lead.status === 'offers_received'"
        text="Пропозиції дійсні до"
        :content="{ align: 'end', side: 'top' }"
        arrow
      >
        <span class="inline-flex items-center gap-1 text-sm font-semibold text-gray-700 cursor-default">
          <UIcon name="i-lucide-calendar-search" class="size-4 shrink-0 text-gray-300" />
          {{ formatDate(lead.expirationTime) }}
        </span>
      </UTooltip>

      <UTooltip
        v-if="lead.status === 'resolved'"
        text="Дата прийняття пропозиції"
        :content="{ align: 'end', side: 'top' }"
        arrow
      >
        <span class="inline-flex items-center gap-1 text-sm font-semibold text-gray-700 cursor-default">
          <UIcon name="i-lucide-calendar-check" class="size-4 shrink-0 text-gray-300" />
          {{ formatDate(lead.updatedAt) }}
        </span>
      </UTooltip>

      <UIcon
        name="i-lucide-chevron-down"
        class="size-5 shrink-0 transition-transform"
        :class="open ? 'rotate-180' : ''"
      />
    </div>
  </div>
</template>

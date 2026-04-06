<script setup lang="ts">
import type { LeadProposalView } from "@bycar-in-ua/crm-sdk";
import { getAvailabilityLabel } from "#layers/crm/utils/helpers";
import DrawerSlideover from "~/components/UI/DrawerSlideover.vue";
import { CardMedia } from "~/components/UI/CarCard";
import { getPowerUnitTitle } from "~/components/Single/helpers";

const props = defineProps<{ proposal: LeadProposalView; }>();

const carTitle = computed(() => {
  const vehicle = props.proposal.vehicle;
  const trim = vehicle.trim;
  const powerUnit = trim?.powerUnits?.[0];

  return [
    vehicle.brand?.displayName,
    vehicle.model,
    trim?.displayName,
    powerUnit && getPowerUnitTitle(powerUnit),
  ].filter(Boolean).join(" ");
});
</script>

<template>
  <DrawerSlideover body-class="flex flex-col justify-between">
    <template #header>
      <div>
        <h2 class="text-3xl font-bold mb-4">
          Підтвердження вибору
        </h2>

        <p class="text-dimmed">
          Після підтвердження ми надішлемо ваші контакти офіційному дилеру для подальшого зв'язку.
        </p>
      </div>
    </template>

    <template #body>
      <div>
        <CardMedia :car-title :img-path="proposal.vehicle.image.path">
          <UBadge color="secondary" :label="getAvailabilityLabel(proposal.availability)" />
        </CardMedia>
      </div>

      <UAlert
        color="warning"
        variant="subtle"
        icon="i-lucide-info"
        description="Зверніть увагу, що після підтвердження інші пропозиції за цим запитом стануть неактивними."
      />
    </template>

    <template #footer>
      <UButton
        type="submit"
        block
      >
        Підтвердити вибір
      </UButton>
    </template>
  </DrawerSlideover>
</template>

<script setup lang="ts">
import type { LeadProposalView } from "@bycar-in-ua/crm-sdk";
import { getAvailabilityLabel } from "#layers/crm/utils/helpers";
import { CarCardMedia, CarCardData } from "~/components/UI/CarCard";
import { getPowerUnitTitle } from "~/components/Single/helpers";

const props = defineProps<{ proposal: LeadProposalView; }>();

const { t } = useI18n();

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

const infoBullets = computed(() => {
  const vehicle = props.proposal.vehicle;

  // eslint-disable-next-line @stylistic/array-bracket-spacing
  const bullets: string[] = [ /* t(`vehicle.bodyTypes.items.${vehicle.bodyType}`) TODO: add body type on backend */ ];

  const powerUnit = vehicle.trim?.powerUnits[0];
  const engine = powerUnit?.engine;

  if (engine) {
    const power = `${engine.power} ${t("units.power")}`;
    let engineType = "";

    if (engine.isElectric) {
      engineType = t("vehicle.engine.electric");
    } else if (engine.isHybrid || engine.isSoftHybrid) {
      engineType = t("vehicle.engine.hybrid");
    } else {
      engineType = t(`vehicle.engine.fuelTypes.${engine.fuelType}`);
    }

    bullets.push([power, engineType].filter(Boolean).join(", "));
  }

  if (engine?.isElectric && engine.electric?.electricDistanceReserve) {
    bullets.push(`${engine.electric.electricDistanceReserve} км запасу ходу`);
  } else if (powerUnit?.consumption?.mixed) {
    bullets.push(`${powerUnit.consumption.mixed} л. / 100 км`);
  }

  const transmission = powerUnit?.transmission;

  if (transmission) {
    const drive = `${t(`vehicle.transmission.driveType.${transmission.drive}`)} привід`;
    const gearbox = t(`vehicle.transmission.gearbox.types.${transmission.gearbox.type}`);

    bullets.push([drive, gearbox].filter(Boolean).join(", "));
  }

  return bullets;
});
</script>

<template>
  <div class="space-y-4">
    <CarCardMedia :car-title :img-path="proposal.vehicle.image.path">
      <UBadge color="secondary" :label="getAvailabilityLabel(proposal.availability)" />
    </CarCardMedia>

    <CarCardData
      :title="carTitle"
      :location="[proposal.dealer.location, proposal.dealer.name].filter(Boolean).join(', ')"
      :info-bullets="infoBullets"
      :min-price="proposal.price"
      :price-format="{
        currency: 'UAH',
        currencyDisplay: 'narrowSymbol',
        trailingZeroDisplay: 'stripIfInteger',
      }"
    />
  </div>
</template>

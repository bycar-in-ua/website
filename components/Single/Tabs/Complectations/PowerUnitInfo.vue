<template>
  <div
    class="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 w-full px-4 justify-center"
  >
    <div
      v-for="(block, index) in blocks"
      :key="index"
      class="max-w-lg w-full"
      :class="block.cssClass"
    >
      <h4 v-text="block.title" />
      <InfoLine
        v-for="(item, index) in block.infoLines"
        :key="index"
        v-bind="item"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "PowerUnitInfo",
});
</script>

<script setup lang="ts">
import { PowerUnitDto as PowerUnit } from "@/common/dto";
import InfoLine, { type InfoLineProps } from "@/components/common/InfoLine.vue";

interface PowerUnitInfoBlock {
  title?: string;
  cssClass?: string;
  infoLines: InfoLineProps[];
}

const props = defineProps<{ powerUnit: PowerUnit }>();

const { $t } = useNuxtApp();

const blocks: PowerUnitInfoBlock[] = [
  {
    title:
      $t("vehicle.engine.title") + ": " + props.powerUnit.engine.displayName,
    cssClass: "row-span-2",
    infoLines: [
      {
        name: $t("vehicle.engine.displacement"),
        value: props.powerUnit.engine.displacement,
      },
      {
        name: $t("vehicle.engine.fuelType"),
        value: $t(
          `vehicle.engine.fuelTypes.${props.powerUnit.engine.fuelType}`,
        ),
      },
      {
        name: $t("tradename"),
        value: props.powerUnit.engine.tradename,
      },
      {
        name: $t("vehicle.manufactureIndex"),
        value: props.powerUnit.engine.manufactureIndex,
      },
      {
        name: $t("vehicle.engine.injectionType"),
        value: $t(
          `vehicle.engine.injectionTypes.${props.powerUnit.engine.injection}`,
        ),
      },
      {
        name: $t("vehicle.engine.pistonsQuantity"),
        value: props.powerUnit.engine.pistons,
      },
      {
        name: $t("vehicle.engine.numberOfValves"),
        value: props.powerUnit.engine.numberOfValves,
      },
      {
        name: $t("vehicle.engine.pistonsPlacement"),
        value: $t(
          `vehicle.engine.pistonsPlacements.${props.powerUnit.engine.pistonsPlacement}`,
        ),
      },
      {
        name: $t("vehicle.engine.cylinderShutOffSystem"),
        value: props.powerUnit.engine.cylinderShutOffSystem ? " " : "",
        children: [
          {
            name: $t("from"),
            value: props.powerUnit.engine.cylinderShutOffNumberFrom,
          },
          {
            name: $t("to"),
            value: props.powerUnit.engine.cylinderShutOffNumberTo,
          },
        ],
      },
      {
        name: $t("vehicle.engine.compressionRatio"),
        value: props.powerUnit.engine.compressionRatio,
      },
      {
        name: $t("vehicle.engine.power"),
        value: props.powerUnit.engine.power,
        children: [
          {
            name: $t("vehicle.engine.rpm2"),
            value: `${
              props.powerUnit.engine.powerRPMfrom
                ? props.powerUnit.engine.powerRPMfrom
                : ""
            }${
              props.powerUnit.engine.powerRPMto
                ? " - " + props.powerUnit.engine.powerRPMto
                : ""
            }`,
          },
        ],
      },
      {
        name: $t("vehicle.engine.torque"),
        value: props.powerUnit.engine.torque,
        children: [
          {
            name: $t("vehicle.engine.rpm2"),
            value: `${
              props.powerUnit.engine.torqueRPMfrom
                ? props.powerUnit.engine.torqueRPMfrom
                : ""
            }${
              props.powerUnit.engine.torqueRPMto
                ? " - " + props.powerUnit.engine.torqueRPMto
                : ""
            }`,
          },
        ],
      },
      {
        name: $t("vehicle.powerUnits.consumption"),
        value:
          props.powerUnit.consumption.city ||
          props.powerUnit.consumption.highway ||
          props.powerUnit.consumption.mixed
            ? " "
            : "",
        children: [
          {
            name: $t("city"),
            value: props.powerUnit.consumption.city,
          },
          {
            name: $t("highway"),
            value: props.powerUnit.consumption.highway,
          },
          {
            name: $t("mixed"),
            value: props.powerUnit.consumption.mixed,
          },
        ],
      },
    ],
  },
  {
    title: $t("vehicle.transmission.gearbox.abbr"),
    infoLines: [
      {
        name: $t("vehicle.transmission.gearbox.type"),
        value:
          $t(
            `vehicle.transmission.gearbox.types.${props.powerUnit.transmission.gearbox.type}`,
          ) +
          ", " +
          $t(
            `vehicle.transmission.gearbox.subTypes.${props.powerUnit.transmission.gearbox.subType}`,
          ),
      },
      {
        name: $t("vehicle.transmission.gearbox.numberOfGears"),
        value: props.powerUnit.transmission.gearbox.numberOfGears,
      },
      {
        name: $t("vehicle.transmission.gearbox.technology"),
        value: props.powerUnit.transmission.gearbox.technology,
      },
      {
        name: $t("vehicle.manufactureIndex"),
        value: props.powerUnit.transmission.gearbox.manufactureIndex,
      },
      {
        name: $t("manufacturer"),
        value: props.powerUnit.transmission.gearbox.made,
      },
    ],
  },
  {
    title: $t("vehicle.transmission.title"),
    infoLines: [
      {
        name: $t("vehicle.transmission.drive"),
        value: $t(
          `vehicle.transmission.driveType.${props.powerUnit.transmission.drive}`,
        ),
      },
      {
        name: $t("vehicle.transmission.driveName"),
        value: props.powerUnit.transmission.driveName,
      },
      {
        name: $t("vehicle.transmission.suspensionTypeFront"),
        value:
          $t(
            `vehicle.transmission.suspensions.allTypes.${props.powerUnit.transmission.suspensionTypeFront}`,
          ) +
          ", " +
          $t(
            `vehicle.transmission.suspensions.workItems.${props.powerUnit.transmission.suspensionWorkItemFront}`,
          ),
      },
      {
        name: $t("vehicle.transmission.suspensionTypeRear"),
        value:
          $t(
            `vehicle.transmission.suspensions.allTypes.${props.powerUnit.transmission.suspensionTypeRear}`,
          ) +
          ", " +
          $t(
            `vehicle.transmission.suspensions.workItems.${props.powerUnit.transmission.suspensionWorkItemRear}`,
          ),
      },
      {
        name: $t("vehicle.transmission.brakingSystemTypeFront"),
        value: $t(
          `vehicle.transmission.brakingSystemTypes.${props.powerUnit.transmission.brakingSystemTypeFront}`,
        ),
      },
      {
        name: $t("vehicle.transmission.brakingSystemTypeRear"),
        value: $t(
          `vehicle.transmission.brakingSystemTypes.${props.powerUnit.transmission.brakingSystemTypeRear}`,
        ),
      },
    ],
  },
  {
    title: $t("vehicle.dynamic"),
    infoLines: [
      {
        name: $t("vehicle.powerUnits.speedUp100"),
        value: props.powerUnit.speedUp100,
      },
      {
        name: $t("vehicle.powerUnits.maxSpeed"),
        value: props.powerUnit.maxSpeed,
      },
    ],
  },
];
</script>

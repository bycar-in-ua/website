import { BodyType, type PowerUnit, type Vehicle } from "@bycar-in-ua/sdk";
import type { Composer } from "#i18n";
import type { InfoBulletProps } from "./interface";
import {
  ElectricStation,
  Engine,
  GasStation,
  GearboxAuto,
  GearboxManual,
  Sedan,
  SUV,
  Minivan,
  Hatchback,
  Coupe,
} from "@/components/UI/Icons";
import type { Component } from "vue";
import Drive from "~/components/UI/Icons/Drive.vue";

export function getInfoBullets(
  {
    car,
    powerUnit,
  }: {
    car: Vehicle;
    powerUnit?: PowerUnit | null;
  },
  t: Composer["t"],
): InfoBulletProps[] {
  const bullets: InfoBulletProps[] = [
    {
      title: t("vehicle.bodyTypes.title"),
      value: t(`vehicle.bodyTypes.items.${car.bodyType}`),
      icon: getBodyTypeIcon(car.bodyType),
    },
  ];

  if (powerUnit?.transmission) {
    bullets.push({
      title: t("vehicle.transmission.drive"),
      value: t(
        `vehicle.transmission.driveType.${powerUnit.transmission.drive}`,
      ),
      icon: Drive,
    });

    if (powerUnit.transmission.gearbox) {
      const type = t(
        `vehicle.transmission.gearbox.types.${powerUnit.transmission.gearbox.type}`,
      );
      const subType = t(
        `vehicle.transmission.gearbox.subTypes.${powerUnit.transmission.gearbox.subType}`,
      );

      const value = powerUnit?.transmission.gearbox.subType ? subType : type;

      bullets.push({
        title: t("vehicle.transmission.gearbox.abbr"),
        value,
        icon:
          powerUnit?.transmission?.gearbox.type === "mechanical"
            ? GearboxManual
            : GearboxAuto,
      });
    }
  }

  if (powerUnit?.engine?.power) {
    bullets.push({
      title: t("vehicle.engine.power"),
      value: `${powerUnit.engine.power} ${t("units.power")}`,
      icon: Engine,
    });
  }

  if (
    powerUnit?.engine?.isElectric &&
    powerUnit.engine.electric.electricDistanceReserve
  ) {
    bullets.push({
      title: t("vehicle.engine.electricDistanceReserve"),
      value: `${powerUnit.engine.electric.electricDistanceReserve} км.`,
      icon: ElectricStation,
    });
  } else if (powerUnit?.consumption?.mixed) {
    bullets.push({
      title: t("vehicle.powerUnits.consumption"),
      value: `${powerUnit.consumption.mixed} ${t("units.volume")}.`,
      icon: GasStation,
    });
  }

  return bullets;
}

export function getBodyTypeIcon(bodyType?: BodyType): Component {
  switch (bodyType) {
    case BodyType.SUV: {
      return SUV;
    }

    case BodyType.coupe: {
      return Coupe;
    }

    case BodyType.hatchback: {
      return Hatchback;
    }

    case BodyType.minivan: {
      return Minivan;
    }

    default:
      return Sedan;
  }
}

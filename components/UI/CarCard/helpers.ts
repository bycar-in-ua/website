import type { Vehicle } from "@bycar-in-ua/sdk";
import type { Composer } from "#i18n";
import {
  GearboxAuto,
  GearboxManual,
  Engine,
  GasStation,
  ElectricStation,
  Speedometer,
} from "@/components/UI/Icons";

export type InfoBullet = {
  text: string;
  title?: string;
  icon: Component;
};

export function getVehicleInfoBullets(
  vehicle: Vehicle,
  t: Composer["t"],
): InfoBullet[] {
  const bullets: InfoBullet[] = [];

  const baseComplectation =
    vehicle.complectations?.find((complectation) => complectation.base) ??
    vehicle.complectations?.[0];

  const basePowerUnit = baseComplectation?.powerUnits?.[0];

  if (!baseComplectation || !basePowerUnit) {
    return bullets;
  }

  if (basePowerUnit.engine?.power) {
    bullets.push({
      text: `${basePowerUnit.engine.power} ${t("units.power")}`,
      title: `${t("from")} ${basePowerUnit.engine.power} ${t("units.power")}`,
      icon: Engine,
    });
  }

  if (basePowerUnit.transmission?.gearbox.type) {
    const type = t(
      `vehicle.transmission.gearbox.types.${basePowerUnit.transmission.gearbox.type}`,
    );
    const subType = basePowerUnit.transmission.gearbox.subType
      ? t(
          `vehicle.transmission.gearbox.subTypes.${basePowerUnit.transmission.gearbox.subType}`,
        )
      : "";

    bullets.push({
      text: type,
      title: `${type} ${subType ? `(${subType})` : ""}`,
      icon:
        basePowerUnit.transmission?.gearbox.type === "mechanical"
          ? GearboxManual
          : GearboxAuto,
    });
  }

  if (
    basePowerUnit.engine?.isElectric &&
    basePowerUnit.engine.electric.electricDistanceReserve
  ) {
    bullets.push({
      text: `${basePowerUnit.engine.electric.electricDistanceReserve} км.`,
      title: t("vehicle.engine.electricDistanceReserve"),
      icon: ElectricStation,
    });
  } else if (basePowerUnit.consumption?.mixed) {
    bullets.push({
      text: `${basePowerUnit.consumption.mixed} ${t("units.volume")}.`,
      title: t("vehicle.powerUnits.consumption"),
      icon: GasStation,
    });
  }

  if (basePowerUnit.maxSpeed) {
    bullets.push({
      text: `${basePowerUnit.maxSpeed} км./г`,
      title: t("vehicle.powerUnits.maxSpeed"),
      icon: Speedometer,
    });
  }

  return bullets.slice(0, 3);
}

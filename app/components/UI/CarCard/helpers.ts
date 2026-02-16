import type { Composer } from "#i18n";
import type { VehicleSearchDocument } from "@bycar-in-ua/vehicles-sdk";

function buildPowerRange(vehicle: VehicleSearchDocument, t: Composer["t"]) {
  const { min, max } = vehicle.powerRange;

  if (min && max && min !== max) {
    return `${min} - ${max} ${t("units.power")}`;
  }

  if (min) {
    return `${min} ${t("units.power")}`;
  }

  return "";
}

function buildEngineType(vehicle: VehicleSearchDocument, t: Composer["t"]) {
  const engineType = vehicle.engineTypes[0];

  if (engineType) {
    if (engineType === "electric") {
      return t("vehicle.engine.electric");
    }

    if (engineType === "hybrid") {
      return t("vehicle.engine.hybrid");
    }

    return t(`vehicle.engine.fuelTypes.${engineType}`);
  }

  return "";
}

export function getVehicleInfoBullets(
  vehicle: VehicleSearchDocument,
  t: Composer["t"],
): string[] {
  const bullets: string[] = [t(`vehicle.bodyTypes.items.${vehicle.bodyType}`)];

  const powerRange = buildPowerRange(vehicle, t);
  const engineType = buildEngineType(vehicle, t);

  bullets.push([powerRange, engineType].filter(Boolean).join(", "));

  // TODO: add consumption

  const drive = vehicle.driveTypes[0] ? `${t(`vehicle.transmission.driveType.${vehicle.driveTypes[0]}`)} привід` : "";
  const gearbox = vehicle.gearboxTypes[0] ? t(`vehicle.transmission.gearbox.types.${vehicle.gearboxTypes[0]}`) : "";

  bullets.push([drive, gearbox].filter(Boolean).join(", "));

  return bullets;
}

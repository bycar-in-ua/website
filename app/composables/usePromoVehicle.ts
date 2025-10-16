import type { AvailableCar } from "~/components/Single/interface";
import AvailableCarModal from "~/components/Single/AvailableCarModal.vue";

export function usePromoVehicle(slug: string, cars: AvailableCar[]) {
  const config = useRuntimeConfig();

  const targetSlugs = config.public.promoVehicles;

  if (!targetSlugs.includes(slug)) {
    return;
  }

  const promoVehicle = cars[0];

  if (!promoVehicle) {
    return;
  }

  const overlay = useOverlay();
  const promoVehicleModal = overlay.create(AvailableCarModal);

  let timer: NodeJS.Timeout | number | null = null;

  const openHandler = () => {
    promoVehicleModal.open({ car: promoVehicle });
    timer = null;
  };

  onMounted(() => {
    timer = setTimeout(openHandler, config.public.promoTimer);
  });

  onBeforeUnmount(() => {
    if (timer) {
      clearTimeout(timer);
    }
  });
}

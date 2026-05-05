import type { RequestFormProps } from "../crm.types";
import { CarRequestSlideover } from "../components/CarRequest";
import { useCarRequestStore } from "../stores/car-request";

export function useCarRequestSlideover() {
  const overlay = useOverlay();
  const store = useCarRequestStore();

  const slideover = overlay.create(CarRequestSlideover);

  const open = (props: RequestFormProps) => {
    store.open(props);
    slideover.open(props);
  };

  return { open };
}

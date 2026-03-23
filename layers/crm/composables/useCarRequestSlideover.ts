import type { RequestFormProps } from "../crm.types";
import CarRequestSlideover from "../components/CarRequestSlideover.vue";

export function useCarRequestSlideover() {
  const overlay = useOverlay();

  const slideover = overlay.create(CarRequestSlideover);

  const open = (props: RequestFormProps) => {
    slideover.open(props);
  };

  return { open };
}

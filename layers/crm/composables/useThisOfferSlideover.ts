import type { RequestFormProps } from "../crm.types";
import ThisOfferSlideover from "../components/ThisOfferSlideover.vue";

export function useThisOfferSlideover() {
  const overlay = useOverlay();

  const slideover = overlay.create(ThisOfferSlideover);

  const open = (props: RequestFormProps) => {
    slideover.open(props);
  };

  return { open };
}

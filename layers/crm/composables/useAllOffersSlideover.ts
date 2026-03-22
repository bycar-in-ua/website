import type { RequestFormProps } from "../crm.types";
import AllOffersSlideover from "../components/AllOffersSlideover.vue";

export function useAllOffersSlideover() {
  const overlay = useOverlay();

  const slideover = overlay.create(AllOffersSlideover);

  const open = (props: RequestFormProps) => {
    slideover.open(props);
  };

  return { open };
}

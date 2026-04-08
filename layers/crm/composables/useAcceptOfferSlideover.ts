import type { LeadProposalView } from "@bycar-in-ua/crm-sdk";
import { AcceptProposalSlideover } from "../components/AcceptProposal";

export function useAcceptOfferSlideover() {
  const overlay = useOverlay();

  const acceptProposalOverlay = overlay.create(AcceptProposalSlideover);

  const open = (leadId: string, proposal: LeadProposalView) => {
    acceptProposalOverlay.open({
      leadId,
      proposal,
    });
  };

  return { open };
}

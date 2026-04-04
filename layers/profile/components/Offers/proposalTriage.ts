import type { LeadProposalView, MyLeadView } from "@bycar-in-ua/crm-sdk";

export interface ProposalBucket {
  label: string;
  proposals: LeadProposalView[];
}

export function triageProposals(lead: MyLeadView, proposals: LeadProposalView[]): ProposalBucket[] {
  const {
    relevant, similar, alternatives,
  } = proposals.reduce(
    (acc, p) => {
      if (p.complectationId === lead.trimId && p.powerUnitId === lead.powerUnitId) {
        acc.relevant.push(p);
      } else if (p.vehicleId === lead.vehicleId) {
        acc.similar.push(p);
      } else {
        acc.alternatives.push(p);
      }
      return acc;
    },
    {
      relevant: [] as LeadProposalView[],
      similar: [] as LeadProposalView[],
      alternatives: [] as LeadProposalView[],
    },
  );

  return [
    relevant.length && {
      label: `Релевантні (${relevant.length})`,
      proposals: relevant,
    },
    similar.length && {
      label: `Схожі (${similar.length})`,
      proposals: similar,
    },
    alternatives.length && {
      label: `Альтернативи (${alternatives.length})`,
      proposals: alternatives,
    },
  ].filter(Boolean) as ProposalBucket[];
}

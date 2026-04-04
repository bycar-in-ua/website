import type { LeadView, ProposalView } from "@bycar-in-ua/crm-sdk";

export interface ProposalBucket {
  label: string;
  proposals: ProposalView[];
}

export function triageProposals(lead: LeadView, proposals: ProposalView[]): ProposalBucket[] {
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
      relevant: [] as ProposalView[],
      similar: [] as ProposalView[],
      alternatives: [] as ProposalView[],
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

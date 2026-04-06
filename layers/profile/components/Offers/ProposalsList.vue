<script setup lang="ts">
import type { MyLeadView, LeadProposalView } from "@bycar-in-ua/crm-sdk";
import ProposalCard from "./ProposalCard.vue";
import AcceptProposalSlideover from "./AcceptProposalSlideover.vue";
import { triageProposals } from "./proposalTriage";

const props = defineProps<{
  lead: MyLeadView;
  proposals: LeadProposalView[];
}>();

const proposalsBuckets = computed(() => triageProposals(props.lead, props.proposals));

const overlay = useOverlay();

const acceptProposalOverlay = overlay.create(AcceptProposalSlideover);

function onAcceptProposal(proposal: LeadProposalView) {
  acceptProposalOverlay.open({ proposal });
}
</script>

<template>
  <div v-if="proposalsBuckets.length === 1" class="space-y-3">
    <ProposalCard
      v-for="proposal in proposalsBuckets[0]?.proposals"
      :key="proposal.id"
      :proposal="proposal"
      @accept="onAcceptProposal(proposal)"
    />
  </div>

  <UTabs
    v-else
    :items="proposalsBuckets"
    variant="link"
    color="secondary"
    class="-mt-2"
    :ui="{ root: 'gap-4' }"
  >
    <template #content="{ item }">
      <div class="space-y-3">
        <ProposalCard
          v-for="proposal in item.proposals"
          :key="proposal.id"
          :proposal="proposal"
          @accept="onAcceptProposal(proposal)"
        />
      </div>
    </template>
  </UTabs>
</template>

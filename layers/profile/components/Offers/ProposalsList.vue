<script setup lang="ts">
import type { LeadView, ProposalView } from "@bycar-in-ua/crm-sdk";
import ProposalCard from "./ProposalCard.vue";
import { triageProposals } from "./proposalTriage";

const props = defineProps<{
  lead: LeadView;
  proposals: ProposalView[];
}>();

const proposalsBuckets = computed(() => triageProposals(props.lead, props.proposals));
</script>

<template>
  <div v-if="proposalsBuckets.length === 1" class="space-y-3">
    <ProposalCard v-for="proposal in proposalsBuckets[0]?.proposals" :key="proposal.id" :proposal="proposal" />
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
        <ProposalCard v-for="proposal in item.proposals" :key="proposal.id" :proposal="proposal" />
      </div>
    </template>
  </UTabs>
</template>

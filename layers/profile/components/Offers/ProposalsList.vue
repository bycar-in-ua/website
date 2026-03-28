<script setup lang="ts">
import type { ProposalView } from "@bycar-in-ua/crm-sdk";
import ProposalCard from "./ProposalCard.vue";

defineProps<{ proposals: ProposalView[]; }>();
</script>

<template>
  <div>
    <ProposalCard v-for="proposal in proposals" :key="proposal.id" :proposal="proposal" />
  </div>
</template>

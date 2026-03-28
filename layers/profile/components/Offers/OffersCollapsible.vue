<script setup lang="ts">
import type { LeadView } from "@bycar-in-ua/crm-sdk";
import { useQuery } from "@tanstack/vue-query";
import { formatDate } from "#shared/date";
import LeadTitle from "./LeadTitle.vue";
import ProposalsList from "./ProposalsList.vue";

const props = withDefaults(defineProps<{
  lead: LeadView;
  defaultOpen?: boolean;
}>(), { defaultOpen: false });

const leadsService = useLeadService();

const isOpen = ref(props.defaultOpen);

const { data: proposals, isLoading } = useQuery({
  queryKey: [
    "profile", "offers", props.lead.id, "proposals",
  ],
  queryFn: () => leadsService.getLeadProposals(props.lead.id),
  enabled: isOpen,
  staleTime: 60_000,
});

const formattedDeadline = computed(() => {
  if (!props.lead.resolutionDeadline) {
    return "";
  }

  return formatDate(props.lead.resolutionDeadline, true);
});
</script>

<template>
  <UCollapsible
    v-model:open="isOpen"
    :default-open="defaultOpen"
    :unmount-on-hide="false"
    class="border border-gray-200"
  >
    <template #default="{ open }">
      <LeadTitle :lead :open />
    </template>

    <template #content>
      <div class="p-4 border-t border-gray-200">
        <UAlert
          v-if="lead.status === 'canceled'"
          color="error"
          variant="subtle"
        >
          <template #description>
            На жаль, час на вибір авто за цим запитом вичерпано. Ви можете створити новий запит, щоб отримати актуальні ціни та наявність у дилерів.
          </template>
        </UAlert>

        <UAlert
          v-else-if="lead.status === 'pending' && !proposals?.length"
          color="warning"
          variant="subtle"
        >
          <template #description>
            Ми вже збираємо найкращі пропозиції від дилерів. Надішлемо сповіщення, як тільки вони будуть готові<span v-if="formattedDeadline">, але не пізніше {{ formattedDeadline }}</span>.
          </template>
        </UAlert>

        <ProposalsList v-else :proposals="proposals || []" />

        <div v-if="isLoading" class="space-y-6">
          <USkeleton class="h-10 rounded-none" />
          <USkeleton class="h-10 rounded-none" />
        </div>
      </div>
    </template>
  </UCollapsible>
</template>

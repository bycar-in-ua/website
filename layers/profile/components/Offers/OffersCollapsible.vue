<script setup lang="ts">
import type { MyLeadView } from "@bycar-in-ua/crm-sdk";
import { useQuery } from "@tanstack/vue-query";
import { formatDate } from "#shared/date";
import LeadTitle from "./LeadTitle.vue";
import ProposalsList from "./ProposalsList.vue";

const props = withDefaults(defineProps<{
  lead: MyLeadView;
  defaultOpen?: boolean;
}>(), { defaultOpen: false });

const requestFetch = useRequestFetch();

const isOpen = ref(props.defaultOpen);

const { data: proposals, isLoading } = useQuery({
  queryKey: [
    "profile", "offers", props.lead.id, "proposals",
  ],
  queryFn: () => requestFetch(`/api/crm/leads/${props.lead.id}/proposals`),
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
      <div class="border-t border-gray-200" :class="lead.status !== 'offers_received' ? 'p-4' : ''">
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

        <ProposalsList v-else :lead :proposals="proposals || []" />

        <div v-if="isLoading" class="space-y-6 mt-4">
          <USkeleton class="h-10 rounded-none" />
          <USkeleton class="h-10 rounded-none" />
        </div>
      </div>
    </template>
  </UCollapsible>
</template>

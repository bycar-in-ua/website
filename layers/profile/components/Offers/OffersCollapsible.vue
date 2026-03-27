<script setup lang="ts">
import type { Lead } from "@bycar-in-ua/crm-sdk";
import { useQuery } from "@tanstack/vue-query";
import { formatDate } from "#shared/date";
import LeadTitle from "./LeadTitle.vue";

const props = withDefaults(defineProps<{
  lead: Lead;
  defaultOpen?: boolean;
}>(), { defaultOpen: false });

const leadsService = useLeadService();

const isOpen = ref(props.defaultOpen);

const shouldLoadProposals = computed(() =>
  isOpen.value
  && (props.lead.status === "offers_received" || props.lead.status === "resolved"),
);

const { data: proposals } = useQuery({
  queryKey: [
    "profile", "offers", props.lead.id, "proposals",
  ],
  queryFn: () => leadsService.getLeadProposals(props.lead.id),
  enabled: shouldLoadProposals,
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
      <div class="px-4 pt-2 pb-4 border-t border-gray-200">
        <UAlert
          v-if="lead.status === 'pending'"
          color="warning"
          variant="subtle"
          class="mt-2"
        >
          <template #description>
            Ми вже збираємо найкращі пропозиції від дилерів. Надішлемо сповіщення, як тільки вони будуть готові<span v-if="formattedDeadline">, але не пізніше {{ formattedDeadline }}</span>.
          </template>
        </UAlert>

        <UAlert
          v-else-if="lead.status === 'canceled'"
          color="error"
          variant="subtle"
          class="mt-2"
        >
          <template #description>
            На жаль, час на вибір авто за цим запитом вичерпано. Ви можете створити новий запит, щоб отримати актуальні ціни та наявність у дилерів.
          </template>
        </UAlert>

        <pre>{{ proposals }}</pre>
      </div>
    </template>
  </UCollapsible>
</template>

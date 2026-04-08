<script setup lang="ts">
import type { LeadProposalView, MyLeadView, PaginatedResponse } from "@bycar-in-ua/crm-sdk";
import DrawerSlideover from "~/components/UI/DrawerSlideover.vue";
import { getPowerUnitTitle } from "~/components/Single/helpers";
import AcceptanceCarCard from "./AcceptanceCarCard.vue";
import AcceptanceSuccess from "./AcceptanceSuccess.vue";
import { useMutation, useQueryClient } from "@tanstack/vue-query";

const props = defineProps<{ leadId: string;
  proposal: LeadProposalView; }>();

const carTitle = computed(() => {
  const vehicle = props.proposal.vehicle;
  const trim = vehicle.trim;
  const powerUnit = trim?.powerUnits?.[0];

  return [
    vehicle.brand?.displayName,
    vehicle.model,
    trim?.displayName,
    powerUnit && getPowerUnitTitle(powerUnit),
  ].filter(Boolean).join(" ");
});

type Stage = "form" | "success";

const stage = ref<Stage>("form");

const isFormStage = computed(() => stage.value === "form");

const queryClient = useQueryClient();

const { mutate: acceptProposal, isPending } = useMutation({
  mutationFn: async () => {
    return $fetch(`/api/crm/leads/${props.leadId}/accept`, {
      method: "POST",
      body: { proposalId: props.proposal.id },
    });
  },
  onSuccess: (lead) => {
    stage.value = "success";
    queryClient.setQueryData(["profile", "leads"], (oldState: PaginatedResponse<MyLeadView>) => {
      const oldLeads = oldState?.items || [];

      const newLeads = oldLeads.map((l) => {
        if (l.id !== lead.id) {
          return l;
        }

        return {
          ...l,
          status: lead.status,
          updatedAt: lead.updatedAt,
        };
      });

      return {
        ...oldState,
        items: newLeads,
      };
    });
    queryClient.invalidateQueries({
      queryKey: [
        "profile", "offers", props.leadId, "proposals",
      ],
    });
  },
});
</script>

<template>
  <DrawerSlideover :body-class="`flex flex-col ${isFormStage ? 'justify-between' : 'justify-center'}`" :hide-borders="!isFormStage">
    <template v-if="isFormStage" #header>
      <div>
        <h2 class="text-3xl font-bold mb-4">
          Підтвердження вибору
        </h2>

        <p class="text-dimmed">
          Після підтвердження ми надішлемо ваші контакти офіційному дилеру для подальшого зв'язку.
        </p>
      </div>
    </template>

    <template #body="{ close }">
      <template v-if="isFormStage">
        <AcceptanceCarCard :proposal />

        <UAlert
          color="warning"
          variant="subtle"
          icon="i-lucide-info"
          description="Зверніть увагу, що після підтвердження інші пропозиції за цим запитом стануть неактивними."
        />
      </template>

      <AcceptanceSuccess v-else-if="!isFormStage" :title="carTitle" @done="close" />
    </template>

    <template v-if="isFormStage" #footer>
      <UButton
        type="submit"
        block
        :loading="isPending"
        @click="acceptProposal()"
      >
        Підтвердити вибір
      </UButton>
    </template>
  </DrawerSlideover>
</template>

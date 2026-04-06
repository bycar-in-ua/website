<script setup lang="ts">
import DrawerSlideover from "~/components/UI/DrawerSlideover.vue";
import type { LeadProposalView } from "@bycar-in-ua/crm-sdk";

defineProps<{ proposal: LeadProposalView; }>();
</script>

<template>
  <DrawerSlideover body-class="flex flex-col justify-between">
    <template #header>
      <div>
        <h2 class="text-3xl font-bold mb-4">
          Підтвердження вибору
        </h2>

        <p class="text-dimmed">
          Після підтвердження ми надішлемо ваші контакти офіційному дилеру для подальшого зв'язку.
        </p>
      </div>
    </template>

    <template #body>
      <div>
        <pre>{{ proposal }}</pre>
      </div>

      <UAlert
        color="warning"
        variant="subtle"
        icon="i-lucide-info"
        description="Зверніть увагу, що після підтвердження інші пропозиції за цим запитом стануть неактивними."
      />
    </template>

    <template #footer>
      <UButton
        type="submit"
        block
      >
        Підтвердити вибір
      </UButton>
    </template>
  </DrawerSlideover>
</template>

<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import MyOffersLeadCollapsible from "#layers/profile/components/MyOffersLeadCollapsible.vue";
import Empty from "~/components/UI/Empty.vue";

definePageMeta({ name: "profile-offers" });

const leadsService = useLeadService();

const {
  data: leads,
  isLoading,
  isError,
  error,
  refetch,
} = useQuery({
  queryKey: ["profile", "leads"],
  queryFn: () => leadsService.getMyLeads(),
});
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="mb-2 text-2xl font-bold">
        Мої пропозиції
      </h2>

      <p class="max-w-2xl text-base font-medium text-dimmed">
        Тут відображаються ваші запити та їхній актуальний статус: пошук авто, готові пропозиції, підтверджені або завершені без вибору.
      </p>
    </div>

    <div v-if="isLoading" class="space-y-6">
      <USkeleton v-for="i in 3" :key="i" class="h-18 rounded-none" />
    </div>

    <div v-else-if="isError" class="border border-red-200 bg-red-50 px-4 py-4 text-red-700">
      <p class="font-semibold">
        Не вдалося завантажити список запитів.
      </p>
      <p v-if="error instanceof Error" class="mt-1 text-sm opacity-80">
        {{ error.message }}
      </p>

      <UButton
        class="mt-4"
        color="error"
        variant="soft"
        @click="refetch()"
      >
        Повторити спробу
      </UButton>
    </div>

    <Empty v-else-if="!leads?.items.length">
      <div class="text-center">
        Поки що у вас немає активних запитів.
        <br>
        Коли ви залишаєте заявку на підбір авто, її статус з’явиться тут.
      </div>
    </Empty>

    <div v-else class="space-y-6">
      <MyOffersLeadCollapsible
        v-for="(lead, index) in leads.items"
        :key="lead.id"
        :lead="lead"
        :default-open="index === 0"
      />
    </div>
  </div>
</template>

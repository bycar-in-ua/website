<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";

definePageMeta({ name: "profile-offers" });

const leadsService = useLeadService();

const { data } = useQuery({
  queryKey: ["profile", "offers"],
  queryFn: () => leadsService.getMyLeads(),
});
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">
      Мої пропозиції
    </h2>
    <p class="text-gray-500">
      Тут з'являться ваші пропозиції від дилерів.
    </p>

    <pre>{{ data }}</pre>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";

definePageMeta({ name: "AvailableCarSingle" });

const route = useRoute();

const availableVehicleId = Number(route.params.id);

const vehiclesService = useVehiclesService();

const { data, suspense } = useQuery({
  queryKey: ["available-vehicle", availableVehicleId],
  queryFn: () => vehiclesService.getAvailableVehicleById(availableVehicleId),
});

await suspense();
</script>

<template>
  <main class="container py-12">
    <pre>{{ data }}</pre>
  </main>
</template>

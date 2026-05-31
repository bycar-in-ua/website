<script setup lang="ts">
import FavoritePaginatedList from "./FavoritePaginatedList.vue";
import { useAvailableVehiclesSearch } from "~/composables/useAvailableVehiclesSearch";
import { useProfile } from "../../composables/useProfile";

const { profile } = useProfile();

const page = ref(1);

const { data, isFetching } = useAvailableVehiclesSearch(() => ({
  filters: { ids: profile.data.value?.savedAvailableCars },
  pagination: {
    limit: 10,
    page: page.value,
  },
}));
</script>

<template>
  <FavoritePaginatedList
    v-if="data"
    v-model:page="page"
    :data="data"
    :loading="isFetching"
    card-type="available"
  />
</template>

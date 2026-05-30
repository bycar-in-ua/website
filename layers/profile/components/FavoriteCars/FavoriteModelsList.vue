<script setup lang="ts">
import FavoritePaginatedList from "./FavoritePaginatedList.vue";
import { useVehiclesSearch } from "~/composables/useVehiclesSearch";
import { useProfile } from "../../composables/useProfile";

const { profile } = useProfile();

const page = ref(1);

const { data, isFetching } = useVehiclesSearch(() => ({
  filters: { ids: profile.data.value?.savedCars },
  pagination: { page: page.value },
}));
</script>

<template>
  <FavoritePaginatedList
    v-if="data"
    v-model:page="page"
    :data="data"
    :loading="isFetching"
    card-type="model"
  />
</template>

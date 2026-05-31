<script setup lang="ts">
import type { TabsItem } from "@nuxt/ui";
import EmptyFavorite from "../../components/FavoriteCars/EmptyFavorite.vue";
import FavoriteAvailableList from "../../components/FavoriteCars/FavoriteAvailableList.vue";
import FavoriteModelsList from "../../components/FavoriteCars/FavoriteModelsList.vue";

definePageMeta({ name: "favorite-cars" });

const { profile, totalSavedCars } = useProfile();

const tabs = computed<TabsItem[]>(() => [
  {
    value: "available",
    label: `З наявності (${profile.data.value?.savedAvailableCars.length ?? 0})`,
    disabled: !profile.data.value?.savedAvailableCars.length,
  },
  {
    value: "model",
    label: `З каталогу моделей (${profile.data.value?.savedCars.length ?? 0})`,
    disabled: !profile.data.value?.savedCars.length,
  },
]);
</script>

<template>
  <div class="relative">
    <EmptyFavorite v-if="totalSavedCars === 0" />

    <UTabs
      v-else
      color="secondary"
      :default-value="profile.data.value?.savedAvailableCars.length ? 'available' : 'model'"
      :items="tabs"
      :ui="{
        root: 'gap-6',
        list: 'justify-start',
        label: 'normal-case leading-normal',
        trigger: 'text-sm sm:text-sm basis-1/2 md:basis-auto md:grow-0',
        content: 'space-y-3 sm:space-y-4',
      }"
    >
      <template #content="{ item }">
        <FavoriteAvailableList v-if="item.value === 'available'" />
        <FavoriteModelsList v-if="item.value === 'model'" />
      </template>
    </UTabs>
  </div>
</template>

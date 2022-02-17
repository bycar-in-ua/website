<template>
  <div>
    <Title> Каталог новых автомобилей | bycar.in.ua </Title>
    <Hero />
    <Latest />
    <Brands />
  </div>
</template>

<script lang="ts">
export default {
  name: "IndexPage",
};
</script>

<script setup lang="ts">
import { useRuntimeConfig, useFetch } from "#app";
import Hero from "@/components/Home/Hero.vue";
import Latest from "@/components/Home/Latest.vue";
import Brands from "@/components/Home/Brands.vue";
import api from "@/utils/apiClient";
import { useHomeStore } from "@/stores/home";

const config = useRuntimeConfig();

const homeStore = useHomeStore();

type Resp = {
  items: Object[];
};

const { data } = await useFetch<string, Resp>("/vehicles?limit=4", {
  baseURL: config.BASE_URL,
});

homeStore.latestItems = data.value.items;
</script>

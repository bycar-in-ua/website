<template>
  <div class="card">
    <NuxtLink v-if="car.featureImage" :to="carRoute">
      <img
        :src="$cdnLink(car.featureImage.path, 480, 300)"
        :alt="car.displayName"
        class="rounded-lg mb-3"
      />
    </NuxtLink>
    <NuxtLink :to="carRoute">
      <h3 class="font-bold uppercase mb-2" v-text="car.displayName" />
    </NuxtLink>
    <div class="flex">
      <NuxtLink :to="carRoute" class="text-primary font-bold text-sm">
        Подробнее
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CarCard",
  props: {
    car: Object,
  },
  computed: {
    carRoute() {
      return `/catalog/${this.car.brand.name}/${this.car.slug}`;
    },
  },
});
</script>

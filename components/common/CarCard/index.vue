<template>
  <div class="bg-white rounded-lg border border-gray-200 p-4 md:p-5">
    <router-link to="/catalog">
      <img
        src="assets/images/homepage-bg.jpg"
        alt="Test"
        class="rounded-lg mb-3"
      />
    </router-link>
    <router-link to="/catalog">
      <h3 class="font-bold uppercase mb-2">BWM X5</h3>
    </router-link>
    <p class="text-sm text-gray-600 mb-6">
      Классический суперкар начала двухтысячных для п...
    </p>
    <div class="flex">
      <router-link
        to="/catalog"
        class="text-primary underline font-bold text-sm hover:no-underline"
      >
        Подробнее
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "CarCard",
};
</script>

<script setup lang="ts"></script>

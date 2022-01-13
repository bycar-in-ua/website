<template>
  <div class="bg-white rounded-lg border border-gray-200 p-4 md:p-5">
    <NuxtLink to="/catalog/bmw/x5-m">
      <img
        src="@/assets/images/homepage-bg.jpg"
        alt="Test"
        class="rounded-lg mb-3"
      />
    </NuxtLink>
    <NuxtLink to="/catalog">
      <h3 class="font-bold uppercase mb-2">BWM X5</h3>
    </NuxtLink>
    <p class="text-sm text-gray-600 mb-6">
      Классический суперкар начала двухтысячных для п...
    </p>
    <div class="flex">
      <NuxtLink
        to="/catalog"
        class="text-primary underline font-bold text-sm hover:no-underline"
      >
        Подробнее
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "CarCard",
};
</script>

<script setup lang="ts"></script>

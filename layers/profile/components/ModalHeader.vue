<script setup lang="ts">
import BluredEllipseBlueAndYellow from "@/components/UI/BluredEllipseBlueAndYellow.vue";
import Logo from "@/components/UI/Logo.vue";

const props = defineProps<{ title: string }>();
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <BluredEllipseBlueAndYellow class="absolute top-0 -z-10" />

    <Logo />
    <h1 class="font-semibold text-3xl text-gray-900 mt-4 mb-2">
      {{ props.title }}
    </h1>
    <p class="text-gray-500">
      Доступ до вибраних авто та найкращих цін
    </p>
  </div>
</template>

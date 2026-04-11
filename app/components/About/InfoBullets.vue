<script setup lang="ts">
type Bullet = {
  value: string;
  title: string;
  description: string;
};

const bullets: Bullet[] = [
  {
    value: "215+",
    title: "Нових авто",
    description:
      "Найповніший каталог офіційних моделей в Україні.",
  },
  {
    value: "150",
    title: "Офіційних дилерів",
    description: "Прямий зв'язок із надійними автосалонами по всій країні.",
  },
  {
    value: "150+",
    title: "Відеооглядів",
    description: "Години чесного контенту для вашого впевненого вибору.",
  },
  {
    value: "15",
    title: "Років експертності",
    description: "Експертиза нашої команди, перевірена часом та ринком.",
  },
];
</script>

<template>
  <section class="container py-12 sm:py-16 md:py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <div
      v-for="(bullet, index) in bullets"
      :key="index"
      class="text-center sm:text-left"
    >
      <div class="text-primary text-5xl sm:text-6xl font-bold mb-3">
        {{ bullet.value }}
      </div>
      <h3 class="text-lg sm:text-xl font-semibold mb-1">
        {{ bullet.title }}
      </h3>
      <p class="text-gray-500 text-sm sm:text-base">
        {{ bullet.description }}
      </p>
    </div>
  </section>
</template>

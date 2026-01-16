<script setup lang="ts">
const panels = [
  {
    title: "Каталог всіх авто",
    description: "характеристики, моделі й ціни в одному місці",
    buttonText: "Дивитися",
    to: "/catalog",
    image: "panel-left",
  },
  {
    title: "Авто в наявності",
    description: "актуальні авто, готові для покупки",
    buttonText: "Обрати авто",
    to: "",
    disabled: true,
    image: "panel-right",
  },
];
</script>

<template>
  <section class="flex flex-col md:flex-row h-200 md:h-175 text-white">
    <div
      v-for="panel in panels"
      :key="panel.title"
      class="panel-background w-full h-full px-4 py-8 md:px-20 md:py-12 flex flex-col justify-end"
      :class="`${panel.image}`"
    >
      <h2 class="text-xl sm:text-3xl md:text-5xl font-bold mb-2 md:mb-3">
        {{ panel.title }}
      </h2>
      <p class="text-lg font-medium mb-4.5 md:mb-10">
        {{ panel.description }}
      </p>
      <UButton :disabled="!!panel.disabled" :to="panel.to" class="w-fit">
        {{ panel.buttonText }}
      </UButton>
    </div>
  </section>
</template>

<style scoped>
.panel-background {
  background-repeat: no-repeat;
  background-blend-mode: multiply;
  background-size: cover;
  background-position: center center;
}
.panel-left {
  background-image: url('/images/dual-panel-left.jpg'), linear-gradient(193.91deg, rgba(0, 0, 0, 0) 55.69%, rgba(0, 0, 0, 0.6) 81.64%);
}
.panel-right {
  background-image: url('/images/dual-panel-right.png'),linear-gradient(193.91deg, rgba(0, 0, 0, 0) 55.69%, rgba(0, 0, 0, 0.6) 81.64%);
}
</style>

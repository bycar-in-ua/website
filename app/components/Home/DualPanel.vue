<script setup lang="ts">
const panels = [
  {
    title: "Каталог моделей",
    description: "характеристики, моделі й ціни в одному місці",
    image: "/images/dual-panel-left.jpg",
    to: "/catalog",
    buttonText: "Дивитися",
    buttonColor: "primary",
    buttonClass: "",
  },
  {
    title: "Авто в наявності",
    description: "актуальні авто, готові для покупки",
    image: "/images/dual-panel-right.png",
    to: "/catalog",
    buttonText: "Обрати авто",
    buttonColor: "secondary",
    buttonClass: "dark",
  },
] as const;
</script>

<template>
  <section class="flex flex-col md:flex-row h-200 md:h-175">
    <div
      v-for="panel in panels"
      :key="panel.title"
      class="panel panel-background w-full h-full py-8 md:py-12 flex flex-col justify-end"
      :style="{ '--bg-url': `url(${panel.image})` }"
    >
      <div class="panel-inner-container">
        <h2 class="text-3xl sm:text-5xl font-bold mb-2 md:mb-3 text-white">
          {{ panel.title }}
        </h2>
        <p class="font-medium mb-4.5 md:mb-10 text-gray-200">
          {{ panel.description }}
        </p>
        <UButton
          :to="panel.to"
          class="justify-center md:w-fit"
          :color="panel.buttonColor"
          :class="panel.buttonClass"
        >
          {{ panel.buttonText }}
        </UButton>
      </div>
    </div>
  </section>
</template>

<style>
@reference "../../assets/css/global.css";

.panel-background {
  background-repeat: no-repeat;
  background-blend-mode: multiply;
  background-size: cover;
  background-position: center center;
  background-image: var(--bg-url), linear-gradient(193.91deg, rgba(0, 0, 0, 0) 55.69%, rgba(0, 0, 0, 0.6) 81.64%);
}

.panel-inner-container {
  max-width: var(--bycar-container-width);
  @apply px-4 md:px-5;
}

@media (min-width: theme(--breakpoint-xl)) {
  .panel-inner-container {
    max-width: calc(var(--bycar-container-width) / 2);
    width: 100%;
  }

  .panel:nth-child(odd) > .panel-inner-container {
    @apply ml-auto pr-20 pl-5;
  }

  .panel:nth-child(even) > .panel-inner-container {
    @apply pl-20 pr-5;
  }
}
</style>

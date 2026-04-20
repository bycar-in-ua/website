<script setup lang="ts">
import BodyTypeCard from "../UI/BodyTypeCard.vue";
import SectionTitle from "../UI/SectionTitle.vue";

const bodyTypes = [
  {
    image: "/images/body-types/crossover.png",
    hoverImage: "/images/body-types/crossover-rotated.png",
    title: "Кросовер",
    query: "crossover",
  },
  {
    image: "/images/body-types/hatchback.png",
    hoverImage: "/images/body-types/hatchback-rotated.png",
    title: "Хетчбек",
    query: "hatchback",
  },
  {
    image: "/images/body-types/sedan.png",
    hoverImage: "/images/body-types/sedan-rotated.png",
    title: "Седан",
    query: "sedan",
  },
  {
    image: "/images/body-types/liftback.png",
    hoverImage: "/images/body-types/liftback-rotated.png",
    title: "Ліфтбек",
    query: "liftback",
  },
  {
    image: "/images/body-types/universal.png",
    hoverImage: "/images/body-types/universal-rotated.png",
    title: "Універсал",
    query: "universal",
  },
];
</script>

<template>
  <section class="flex flex-col pt-12 md:pt-20 pb-12 md:pb-6 text-white">
    <SectionTitle
      :title="['Кузов', 'Обирай найкраще для себе']"
      class="mb-8 md:mb-10"
    >
      <template #extra>
        <UButton
          variant="outline"
          to="/catalog"
          class="hidden sm:flex ml-4 whitespace-nowrap"
        >
          Всі авто
        </UButton>
      </template>
    </SectionTitle>

    <UCarousel
      v-slot="{ item }"
      :items="bodyTypes"
      :ui="{
        viewport: 'max-sm:-me-4',
        item: 'basis-[55%] sm:basis-1/3 md:basis-1/4 lg:basis-1/5',
      }"
      align="start"
      class="mb-14"
    >
      <BodyTypeCard v-bind="item" />
    </UCarousel>

    <UButton
      variant="outline"
      to="/catalog"
      class="sm:hidden w-full flex justify-center"
      block
    >
      Всі авто
    </UButton>
  </section>
</template>

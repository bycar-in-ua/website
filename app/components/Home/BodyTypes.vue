<script setup lang="ts">
import BodyTypeCard from "../UI/BodyTypeCard.vue";
import SectionTitle from "../UI/SectionTitle.vue";

const bodyTypes = [
  {
    image: "/images/crossover.png",
    title: "Кросовер",
    query: "crossover",
  },
  {
    image: "/images/hatchback.png",
    title: "Хетчбек",
    query: "hatchback",
  },
  {
    image: "/images/sedan.png",
    title: "Седан",
    query: "sedan",
  },
  {
    image: "/images/liftback.png",
    title: "Ліфтбек",
    query: "liftback",
  },
  {
    image: "/images/universal.png",
    title: "Універсал",
    query: "universal",
  },
];
</script>

<template>
  <section class="flex flex-col px-4 py-12 md:p-20 text-white">
    <SectionTitle
      :title="['Кузов', 'Обирай найкраще для себе']"
      class="mb-8 md:mb-10 text-black justify-between w-full"
    >
      <template #extra>
        <UButton
          variant="outline"
          to="/catalog"
          class="hidden md:flex ml-4 whitespace-nowrap"
        >
          Всі авто
        </UButton>
      </template>
    </SectionTitle>

    <div class="hidden xl:flex justify-between gap-5">
      <BodyTypeCard v-for="item in bodyTypes" :key="item.title" :item="item" />
    </div>

    <UCarousel
      v-slot="{ item }"
      :items="bodyTypes"
      :ui="{
        item: 'basis-1/2 sm:basis-1/3',
      }"
      class="xl:hidden mb-14"
      dots
    >
      <BodyTypeCard :item="item" />
    </UCarousel>

    <UButton
      variant="outline"
      to="/catalog"
      class="md:hidden w-full flex justify-center"
    >
      Всі авто
    </UButton>
  </section>
</template>

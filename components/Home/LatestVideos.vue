<script setup lang="ts">
import SectionTitle from "@/components/UI/SectionTitle.vue";
import { type YouTubeVideoItem, YouTubeVideoCard } from "../UI/VideoCard";

const items: YouTubeVideoItem[] = [
  {
    videoId: "o07p4TYqZ-Y",
    title: "В чому секрет Mitsubishi Lancer Evolution?",
    description:
      "На базі Mitsubishi Lancer Evolution досі будують спортивні авто буквально для всіх дисциплін автоспорту. Це означає, що в цих авто є точно щось особливе. І як правило, за такими машинами стоять люди, які мали мрію. У цьому випуску знайомимося із історією моделі Lancer Evolution, дізнаємося, як живеться цим авто і їх власникам сьогодні в Україні, а також катаємося по звичайних і грунтових дорогах. Mitsubishi Lancer Evolution 10 на тесті ByCar.",
  },
  {
    videoId: "iEPBrKJ0jpg",
    title: "Тест-драйв НОВОГО Volkswagen Golf 8 2025: вони все виправили?",
    description:
      'Є у німців із Вольфсбурга ще одна особливість - вони чудово вміють виправляти свої помилки під час рестайлінгу. То чи вийшло в них це цього разу, і чи зможе оновлений Гольф "вісім, так би мовити, з половиною" повернутися на трон європейських продажів і, що ще більш складніше, відкусити трохи українського автомобільного ринку? Розбираємося в нашому тест-драйві рестайлінгового Volkswagen Golf 8.',
  },
  {
    videoId: "hJa3u4BfHzU",
    title: "Чому Suzuki Jimny - це мрія багатіїв?",
    description:
      "Suzuki Jimny - авто, яке побудовано на технологіях минулого сторіччя, але при цьому його купують люди, у яких в гаражі стоять дуже дорогі авто. Як так сталося? Розбираємось в нашому відео, а головне ганяємо по звичайних дорогах та підкорюємо бездоріжжя!",
  },
];

const carouselRef = ref();

let intevalId: number | NodeJS.Timeout | undefined;

const nextHandler = () => {
  if (carouselRef.value.page === carouselRef.value.pages) {
    return carouselRef.value.select(1);
  }

  carouselRef.value.next();
};

const prevHandler = () => {
  if (carouselRef.value.page === 1) {
    return carouselRef.value.select(carouselRef.value.pages);
  }

  carouselRef.value.prev();
};

const autoplayCallback = () => {
  if (!carouselRef.value) return;

  nextHandler();
};

const autoplayInterval = 5_000;

onMounted(() => {
  intevalId = setInterval(autoplayCallback, autoplayInterval);
});

onBeforeUnmount(() => {
  clearInterval(intevalId);
});

const mouseoverHandler = () => {
  clearInterval(intevalId);
  intevalId = undefined;
};

const mouseleaveHandler = () => {
  intevalId = setInterval(autoplayCallback, autoplayInterval);
};
</script>

<template>
  <section
    class="my-10 md:my-24"
    @mouseover="mouseoverHandler"
    @mouseleave="mouseleaveHandler"
    @touchstart="mouseoverHandler"
    @touchend="mouseleaveHandler"
  >
    <SectionTitle title="Останні відео на каналі">
      <template #extra>
        <UButtonGroup size="sm" orientation="horizontal">
          <UButton
            variant="ghost"
            icon="i-heroicons-chevron-left"
            @click="prevHandler"
          />
          <UButton
            variant="ghost"
            icon="i-heroicons-chevron-right"
            @click="nextHandler"
          />
        </UButtonGroup>
      </template>
    </SectionTitle>

    <UCarousel
      ref="carouselRef"
      :items="items"
      :ui="{
        item: 'basis-full',
        arrows: { wrapper: 'opacity-40 hover:opacity-100 transition-opacity' },
        indicators: { wrapper: 'static mt-4' },
      }"
      class="overflow-hidden"
      indicators
    >
      <template #default="{ item }">
        <YouTubeVideoCard :item />
      </template>

      <template #indicator="{ onClick, page, active }">
        <UButton
          :variant="active ? 'solid' : 'soft'"
          size="xs"
          class="rounded-full"
          @click="onClick(page)"
        />
      </template>
    </UCarousel>
  </section>
</template>

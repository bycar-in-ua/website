<script setup lang="ts">
import SectionTitle from "@/components/UI/SectionTitle.vue";
import { type YouTubeVideoItem, YouTubeVideoCard } from "../UI/VideoCard";

const CHANNEL_ID = "UCNRibUtlCxkC7jI3kywGLHA";
// const res = await fetch(`https://www.googleapis.com/youtube/v3/search?key=YOUR_API_KEY&channelId=CHANNEL_ID&part=snippet&order=date&maxResults=3`);

// GET https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCNRibUtlCxkC7jI3kywGLHA&maxResults=3&order=date&key=[YOUR_API_KEY] HTTP/1.1

// Authorization: Bearer [YOUR_ACCESS_TOKEN]
// Accept: application/json

const items: YouTubeVideoItem[] = [
  {
    videoId: "OCQcHq2Htj8",
    title: "Toyota CH-R 2025 за 50 000 $ - це жарт?",
    description: "Клас компактних кросоверів стає все популярнішим, і при цьому все дорожчим. Причому, часто причину цієї дороговизни визначити складно. Все ніби зводиться до банальної думки: \"ну це ж кросовер\". От і нова Toyota C-HR безумовно вражає своїм виглядом, але чи може вона дати щось окрім цього вау-фактора за свої вже дуже немаленькі гроші? Розбираємося в тест-драйві ByCar.",
  },
  {
    videoId: "ekup2bPGYw8",
    title: "Чому VW Touareg найпопулярніший новий Volkswagen в Україні?",
    description:
      "VW Touareg є найбільш продаваємим новим Volkswagen в Україні вже дуже багато років. І це й не дивно, адже він є фактично найдешевшим квитком до преміальних VAG-ів. Touareg побудовано на платформі MLB-evo, на якій також базуються такі авто як Audi Q7, Q8, Porsche Cayenne, Bentley Bentayga і навіть Lamborghini Urus. То що це за автомобіль? Розбираємось в тест-драйві від ByCar.",
  },
  {
    videoId: "o07p4TYqZ-Y",
    title: "В чому секрет Mitsubishi Lancer Evolution?",
    description:
      "На базі Mitsubishi Lancer Evolution досі будують спортивні авто буквально для всіх дисциплін автоспорту. Це означає, що в цих авто є точно щось особливе. І як правило, за такими машинами стоять люди, які мали мрію. У цьому випуску знайомимося із історією моделі Lancer Evolution, дізнаємося, як живеться цим авто і їх власникам сьогодні в Україні, а також катаємося по звичайних і грунтових дорогах. Mitsubishi Lancer Evolution 10 на тесті ByCar.",
  },
];

const carouselRef = useTemplateRef("carouselRef");

const mouseoverHandler = () => {
  carouselRef.value?.emblaApi?.plugins().autoplay.stop();
};

const mouseleaveHandler = () => {
  carouselRef.value?.emblaApi?.plugins().autoplay.play();
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
            @click="carouselRef?.emblaApi?.scrollPrev()"
          />
          <UButton
            variant="ghost"
            icon="i-heroicons-chevron-right"
            @click="carouselRef?.emblaApi?.scrollNext()"
          />
        </UButtonGroup>
      </template>
    </SectionTitle>

    <UCarousel
      ref="carouselRef"
      :items="items"
      :ui="{
        root: 'basis-full',
        arrows: 'opacity-40 hover:opacity-100 transition-opacity',
        dots: 'static mt-4',

      }"
      class="overflow-hidden"
      style="--ui-border-inverted: var(--ui-primary)"
      dots
      loop
      :autoplay="{
        delay: 5000,
      }"
    >
      <template #default="{ item }">
        <YouTubeVideoCard :item />
      </template>
    </UCarousel>
  </section>
</template>

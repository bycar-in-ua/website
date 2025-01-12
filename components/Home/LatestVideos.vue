<script setup lang="ts">
import SectionTitle from "@/components/UI/SectionTitle.vue";
import { type YouTubeVideoItem, YouTubeVideoCard } from "../UI/VideoCard";

const items: YouTubeVideoItem[] = [
  {
    videoId: "oBsBECfwGKY",
    title: "Тест-драйв Toyota Corolla Cross: як продати Corolla за $40 000",
    description:
      "Кросовери завойовують ринок. І ця любов у людей настільки вже глибоко у голові, що виробники перетворюють на кросовери ніби все, що попадається під руку. Так і Тойота зробила зі своєї легендарної Короли кросовер. І ніби все чудово, але ж ціна! Авто у топових комплектаціях коштує майже як старший RAV4. Чи є сенс його купувати за такий прайс? Сьогодні розбираємося у нашому тест-драйві Toyota Corolla Cross",
  },
  {
    videoId: "v89V2837dmc",
    title: "Mitsubishi Eclipse - легенда 90-х чи просто спогад із дитинства?",
    description:
      "Всі ми знаємо Mitsubishi Eclipse із фільмів та ігор, за якими пройшло наше дитинство. Але якщо відкинути ностальгію, чи зможе це авто вразити на ходу? У цьому відео знайомимося із Легендою 90-х Mitsubishi Eclipse.",
  },
  {
    videoId: "A-Q6GR1sLEs",
    title: "Mazda MX-5 - чому вона така особлива?",
    description:
      "Багато хто називає Mazda MX-5 найкращим спорткаром. Але як авто із потужністю менше ніж у деяких версіях Шкоди Октавії можи бути не те що найкращим, а хоча би просто спорткаром? У цьому відео ми із цим розберемося остаточно!",
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

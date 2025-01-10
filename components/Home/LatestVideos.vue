<script setup lang="ts">
import SectionTitle from "@/components/UI/SectionTitle.vue";
import { type YouTubeVideoItem, YouTubeVideoCard } from "../UI/VideoCard";

const items: YouTubeVideoItem[] = [
  {
    src: "https://www.youtube.com/embed/v89V2837dmc?si=ofMMiDhQRWP1k7or",
    title: "Mitsubishi Eclipse - легенда 90-х чи просто спогад із дитинства?",
    description:
      "Всі ми знаємо Mitsubishi Eclipse із фільмів та ігор, за якими пройшло наше дитинство. Але якщо відкинути ностальгію, чи зможе це авто вразити на ходу? У цьому відео знайомимося із Легендою 90-х Mitsubishi Eclipse.",
  },
  {
    src: "https://www.youtube.com/embed/A-Q6GR1sLEs?si=N0gH8ekkMn-mg8N6",
    title: "Mazda MX-5 - чому вона така особлива?",
    description:
      "Багато хто називає Mazda MX-5 найкращим спорткаром. Але як авто із потужністю менше ніж у деяких версіях Шкоди Октавії можи бути не те що найкращим, а хоча би просто спорткаром? У цьому відео ми із цим розберемося остаточно!",
  },
  {
    src: "https://www.youtube.com/embed/t2bcnAYvIQo?si=BUpGOfbeIz3eD7_G",
    title:
      "Новий Suzuki Swift - це найкращий варіант за 20 000$ ? | тест-драйв від ByCar",
    description:
      'Колись хетчбеки В-класу були дуже популярні, але поява кросоверів, а також ринок авто зі США це змінили, і ледве не погубили цей клас в нашій країні. Але ці малюки не здалися і потроху повертають свої позиції. У цьому відео будемо знайомитися із новим Suzuki Swift у сьомому поколінні і дізнаємося, що може цей малюк протиставити кросоверам та "биткам".',
  },
];
</script>

<template>
  <section class="my-10 md:my-24">
    <SectionTitle title="Останні відео на каналі">
      <template #extra>
        <UButton
          variant="link"
          icon="i-heroicons-arrow-right"
          trailing
          class="mt-4 md:mt-0"
          to="https://www.youtube.com/@bycar.in.ua_"
          target="_blank"
        >
          Перейти на YouTube
        </UButton>
      </template>
    </SectionTitle>

    <UCarousel
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

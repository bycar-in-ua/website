<script setup lang="ts">
import SectionTitle from "~/components/UI/SectionTitle.vue";
</script>

<template>
  <section class="bg-black py-12 sm:py-16 lg:py-20 dark">
    <div class="container">
      <div class="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-2 mb-8 md:mb-12">
        <SectionTitle :title="['Хто ми', 'Команда зсередини']" class="lg:basis-1/2" />
        <p class="text-dimmed lg:basis-1/2">
          Ми з тих, хто впізнає нову модель ще до офіційної презентації і сперечається про комплектації голосніше, ніж про футбол. Зібрались разом і зробили сайт з новими авто, яким хотіли б користуватись самі, коли настане час міняти власну машину.
        </p>
      </div>

      <img src="/images/about-us-hero.jpg" alt="Команда ByCar" class="aspect-video object-cover">
    </div>
  </section>
</template>

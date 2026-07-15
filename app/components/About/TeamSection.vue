<script setup lang="ts">
import SectionTitle from "~/components/UI/SectionTitle.vue";
</script>

<template>
  <section class="bg-black py-12 sm:py-16 lg:py-20 dark">
    <div class="container">
      <div class="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-2 mb-8 md:mb-12">
        <SectionTitle :title="['Хто ми', 'Команда зсередини']" class="lg:basis-1/2" />
        <p class="text-dimmed lg:basis-1/2">
            ByCar — це команда професіоналів: дипломовані автомобільні інженери, журналісти та люди з багаторічним досвідом в автобізнесі. Ми закохані в автомобілі та прагнемо бути корисними нашій країні й людям.
        </p>
      </div>

      <img src="/images/about-us-team.jpg" alt="Команда ByCar" class="aspect-video object-cover">
    </div>
  </section>
</template>

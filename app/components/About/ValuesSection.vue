<script setup lang="ts">
import SectionTitle from "~/components/UI/SectionTitle.vue";

const values = [
  ["Чесність", "Кожне авто на сайті — нове і від офіційного дилера в Україні, з повною гарантією, прозорими умовами і підтвердженою комплектацією."],
  ["Повага", "Ваш контакт не йде дилерам, поки ви самі не оберете пропозицію: тут ви вирішуєте, коли почати розмову з салоном, а не навпаки."],
  ["Експертність", "Розбираємось у нових авто зсередини: знаємо моделі, комплектації й різницю між двигунами не гірше, ніж менеджери в самих салонах."],
  ["Підтримка", "Не можете визначитись — на звʼязку наш спеціаліст, який безкоштовно допоможе розібратись у ваших потребах і підібрати авто саме під вас."],
] as const;
</script>

<template>
  <section class="bg-black dark py-12 sm:py-16 md:py-20">
    <div class="container">
      <SectionTitle :title="['Наші цінності', 'Лише важливе']" heading-class="text-3xl" />

      <div class="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2">
        <div
          v-for="(value, index) in values"
          :key="index"
          class="min-h-50 sm:min-h-80 flex flex-col justify-between p-6 sm:p-8 border border-gray-900 hover:border-primary-500 hover:bg-primary-500 cursor-pointer transition-colors group"
        >
          <h3 class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-100">
            {{ value[0] }}
          </h3>
          <p class="sm:text-lg text-gray-200 lg:text-black group-hover:text-gray-200 transition-colors">
            {{ value[1] }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionTitle from "~/components/UI/SectionTitle.vue";

const steps = [
  {
    title: "Знайдіть авто, яке вам до душі",
    subtitle: "актуальні моделі, широкий вибір і спецпропозиції",
  },
  {
    title: "Залиште запит по обраному авто",
    subtitle: "а ми підготуємо найкращі пропозиції",
  },
  {
    title: "Отримайте найкращі варіанти",
    subtitle: "усі пропозиції чекають на вас в особистому кабінеті",
  },
  {
    title: "Порівняйте й зробіть свій вибір",
    subtitle: "де ціна, комплектація і відчуття збігаються ідеально",
  },
  {
    title: "Оформіть покупку та заберіть авто",

    subtitle: "залишилося сісти за кермо та насолоджуватися",
  },
];
</script>

<template>
  <section class="bg-black text-white py-20">
    <div class="container grid grid-cols-2 gap-4">
      <div>
        <SectionTitle :title="['Крок за кроком', 'Шлях до отримання авто']" class="mb-12 dark" />

        <div class="divide-y divide-gray-900 border-t border-b border-gray-900">
          <div v-for="(step, index) in steps" :key="index" class="flex items-start space-x-4 py-8">
            <div class="shrink-0">
              <div class="text-dimmed font-semibold">
                (0{{ index + 1 }})
              </div>
            </div>
            <div>
              <h3 class="text-3xl font-bold">
                {{ step.title }}
              </h3>
              <p class="mt-1 text-lg text-gray-300">
                {{ step.subtitle }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="pl-12">
        <img src="/images/how-it-works.png" alt="How It Works" class="w-full h-full object-cover object-left">
      </div>
    </div>
  </section>
</template>

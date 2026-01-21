<script setup lang="ts">
import Quote from "../UI/Icons/Quote.vue";
import SectionTitle from "../UI/SectionTitle.vue";
</script>

<template>
  <section
    class="flex flex-col md:flex-row gap-8 md:gap-4 items-stretch px-4 py-12 md:p-20"
  >
    <div class="md:w-1/2 flex flex-col grow">
      <SectionTitle
        :title="['Кузов', 'Обирай найкраще для себе']"
        class="mb-4.5 text-black justify-between w-full"
      >
        <template #title>
          <h2 class="text-xl sm:text-3xl md:text-5xl font-bold grow">
            <Quote class="mb-5 md:mb-8 h-6 md:h-11" />
            “Авто має знайти вас так само легко, як ви — його”
          </h2>
        </template>
      </SectionTitle>

      <p class="text-lg font-medium text-gray-500 mb-6 md:mb-12">
        Наш сервіс об’єднує людей, які шукають авто, і дилерів, які мають
        найкращі пропозиції. Ми робимо процес пошуку і покупки максимально
        простим та зрозумілим.
      </p>

      <UButton variant="outline" class="flex justify-center mt-auto md:w-fit">
        Наша історія
      </UButton>
    </div>

    <div
      class="md:w-1/2 flex justify-center md:justify-end aspect-16/10 md:aspect-auto"
    >
      <div class="relative w-full md:w-auto">
        <img
          src="/images/founder.png"
          alt="Засновник ByCar Евгеній Тхор"
          class="w-full h-auto md:h-full md:w-auto object-cover object-[30%_50%]"
        >

        <div
          class="absolute left-6 bottom-6.5 md:left-8 md:bottom-3.5 text-white"
        >
          <p class="text-xl font-bold">
            Евгеній Тхор
          </p>
          <p class="text-base font-medium">
            Засновник ByCar
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionTitle from "~/components/UI/SectionTitle.vue";

const values = [
  ["Чесність", "Наші послуги для покупця авто безкоштовні. Тільки якісні авто. Не важливо нове чи Б/В - воно має відповідати нашим високим вимогам і потребам клієнта"],
  ["Зручність", "Зручний і зрозумілий шлях вибору: всі автомобілі представлені на одному ресурсі із прозорою інформацією - виставив фільтри, отримав перелік авто, які підходять під твою потребу"],
  ["Експертність", "Власні тести. Ми єдині в Україні робимо їздові випробування і заміри автомобілів. Ми знаємо всі переваги та недоліки авто краще, ніж представники бренду"],
  ["Підтримка", "Не знаєш свою потребу? Ми допоможемо її виявити! "],
] as const;
</script>

<template>
  <section class="bg-black dark py-12 sm:py-16 md:py-20">
    <div class="container">
      <SectionTitle :title="['Наші цінності', 'Лише важливе']" />

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

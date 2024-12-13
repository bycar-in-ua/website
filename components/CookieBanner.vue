<script setup lang="ts">
defineEmits(["acceptCookie"]);
</script>

<template>
  <div
    class="max-w-[700px] fixed bottom-4 left-1/2 -translate-x-1/2 z-40 p-4 rounded-xl shadow-sm bg-white prose-sm"
  >
    <h3 class="text-center">Ми використовуємо "Сookie"</h3>

    <p>
      Ми використовуємо файли cookies для покращення роботи веб-сайту, розробки
      контентної стратегії та аналізу статистичних даних. Використовуючи цей
      веб-сайт, Ви погоджуєтеся з нашою
      <NuxtLink to="/cookie-policy">
        Політикою використання файлів cookies</NuxtLink
      >.
    </p>

    <div class="flex justify-center items-center gap-2">
      <UButton size="xs" @click="$emit('acceptCookie')">Зрозуміло</UButton>
      чи
      <NuxtLink size="xs" to="/cookie-policy">Дізнатись більше</NuxtLink>
    </div>
  </div>
</template>

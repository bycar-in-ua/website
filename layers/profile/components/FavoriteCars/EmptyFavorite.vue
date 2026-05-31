<template>
  <div>
    <h3 class="text-3xl md:text-5xl font-bold mb-4">
      Ваше обране чекає на фаворитів
    </h3>

    <p class="md:text-lg text-muted mb-4">
      Тисніть на <UButton
        icon="i-lucide-bookmark"
        variant="outline"
        color="secondary"
        class="rounded-full pointer-events-none"
        size="sm"
      /> біля моделей, що вас зацікавили, щоб зберігти їх в обраному.
    </p>

    <p class="md:text-lg text-muted mb-6 md:mb-8">
      Знайомтеся з моделями авто та їхніми цінами або шукайте варіанти, що вже чекають у салонах.
    </p>

    <div class="flex max-sm:flex-col gap-2 sm:gap-3">
      <UButton class="justify-center" :to="{ name: 'available-catalog' }">
        Авто в наявності
      </UButton>

      <UButton variant="outline" class="justify-center" :to="{ name: 'catalog' }">
        Каталог моделей
      </UButton>
    </div>
  </div>
</template>

<template>
  <div class="mb-6 flex gap-5">
    <h2 class=" font-semibold text-3xl">
      Каталог авто
    </h2>
    <div class="ml-auto">
      <USelect
        placeholder="Сортувати"
        color="primary"
        variant="none"
        :options="[
          { value: 'price', label: 'Ціна' },
          { value: 'year', label: 'Рік' },
        ]"
        :ui="{ placeholder: 'text-primary' }"
      />
    </div>
  </div>
</template>

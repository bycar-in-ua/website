<script setup lang="ts">
const {
  state, schema, onSubmit,
} = useCarRequestForm();
</script>

<template>
  <UForm
    :state
    :schema
    class="space-y-4"
    @submit="onSubmit"
  >
    <UFormField label="Ім'я" name="name">
      <UInput
        v-model="state.name"
        placeholder="Введіть ваше імʼя"
        class="w-full"
      />
    </UFormField>

    <UFormField label="Телефон" name="phone">
      <UInput
        v-model="state.phone"
        placeholder="+380"
        class="w-full"
      />
    </UFormField>

    <UFormField label="Пошта" name="email">
      <UInput
        v-model="state.email"
        placeholder="example@gmail.com"
        class="w-full"
      />
    </UFormField>

    <UFormField label="Комплектації">
      <div class="flex justijy-between items-start gap-4 mt-1.5">
        <p class="text-base font-medium text-dimmed max-w-85.5 mr-auto">
          Запропонуємо варіанти з іншим набором опцій для пошуку кращої ціни
        </p>

        <USwitch />
      </div>
    </UFormField>

    <USeparator :ui="{ border: 'border-gray-200' }" />

    <UFormField label="Альтернативи">
      <div class="flex justijy-between items-start gap-4 mt-1.5">
        <p class="text-base font-medium text-dimmed max-w-85.5 mr-auto">
          Підіберемо найкращі альтернативи в класі для порівняння
        </p>

        <USwitch />
      </div>
    </UFormField>
  </UForm>
</template>

<script setup lang="ts">
import type { RequestFormProps } from "../crm.types";
import { useCarRequestStore } from "#layers/crm/stores/car-request";

withDefaults(defineProps<RequestFormProps>(), { direct: false });

const store = useCarRequestStore();
</script>

<template>
  <UForm
    :state="store.state"
    :schema="store.schema"
    class="space-y-4"
    :disabled="store.isPending"
    @submit="store.submitForm()"
  >
    <UFormField label="Ім'я" name="name">
      <UInput
        v-model="store.state.name"
        placeholder="Введіть ваше імʼя"
        class="w-full"
      />
    </UFormField>

    <UFormField label="Телефон" name="phone">
      <UInput
        v-model="store.state.phone"
        placeholder="+380"
        type="tel"
        class="w-full"
      />
    </UFormField>

    <UFormField label="Пошта" name="email">
      <UInput
        v-model="store.state.email"
        placeholder="example@gmail.com"
        class="w-full"
      />
    </UFormField>

    <template v-if="!direct">
      <UFormField label="Комплектації">
        <div class="flex justify-between items-start gap-4 mt-1.5">
          <p class="text-base font-medium text-dimmed max-w-85.5 mr-auto">
            Запропонуємо варіанти з іншим набором опцій для пошуку кращої ціни
          </p>

          <USwitch v-model="store.state.trimFlexible" />
        </div>
      </UFormField>

      <USeparator :ui="{ border: 'border-gray-200' }" />

      <UFormField label="Альтернативи">
        <div class="flex justify-between items-start gap-4 mt-1.5">
          <p class="text-base font-medium text-dimmed max-w-85.5 mr-auto">
            Підберемо найкращі альтернативи в класі для порівняння
          </p>

          <USwitch v-model="store.state.vehicleFlexible" />
        </div>
      </UFormField>
    </template>
  </UForm>
</template>

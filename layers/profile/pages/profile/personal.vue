<script setup lang="ts">
definePageMeta({ name: "profile-personal" });

const {
  state,
  updatePersonalData,
  loading,
} = usePersonalDataForm();

const form = useTemplateRef("form");
</script>

<template>
  <div>
    <UForm
      ref="form"
      :state="state"
      class="space-y-6"
      @submit="(e) => { updatePersonalData(e.data) }"
    >
      <UFormField label="Ім'я" name="firstName">
        <UInput
          v-model="state.firstName"
          placeholder="Вкажіть ім'я"
          class="w-full"
        />
      </UFormField>

      <UFormField label="Прізвище" name="lastName">
        <UInput
          v-model="state.lastName"
          placeholder="Вкажіть прізвище"
          class="w-full"
        />
      </UFormField>

      <UFormField label="Пошта" name="email">
        <UInput
          v-model="state.email"
          class="w-full"
        />
      </UFormField>

      <UFormField label="Телефон" name="phone">
        <UInput
          v-model="state.phone"
          class="w-full"
        />
      </UFormField>

      <UButton :disabled="!form?.dirty" :loading @click="form?.submit()">
        Зберегти
      </UButton>
    </UForm>
  </div>
</template>
